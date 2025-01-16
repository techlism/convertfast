"use client";
import { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Download, Info, UploadIcon } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import {
	SelectValue,
	SelectTrigger,
	SelectContent,
	Select,
	SelectGroup,
	SelectItem,
} from "@/components/ui/select";
import { Progress } from "./ui/progress";
import { Input } from "@/components/ui/input";
import InfoTooltip from "./InfoTooltip";
import { FilmIcon, MusicIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { ChangeFileAlertDialog } from "./ChangeFileAlert";

type CoreConfig = {
	coreURL: string;
	wasmURL: string;
	workerURL?: string;
};

interface VideoSettings {
	resolution: string;
	aspectRatio: string;
	constantQuality: string;
	frameRate: string;
	audioCodec: string;
	audioBitrate: string;
	channels: string;
	volume: string;
	sampleRate: string;
	fit: string;
	preset: string;
}

const DEFAULT_SETTINGS: VideoSettings = {
	resolution: "original",
	aspectRatio: "original",
	constantQuality: "original",
	frameRate: "original",
	audioCodec: "original",
	audioBitrate: "original",
	channels: "original",
	volume: "original",
	sampleRate: "original",
	fit: "original",
	preset: "original",
};

export default function VideoProperties({
	format,
	primaryFormat,
}: {
	format: string;
	primaryFormat: string;
}) {
	const [loaded, setLoaded] = useState(false);
	const ffmpegRef = useRef(new FFmpeg());
	const [message, setMessage] = useState("");
	const [inputFile, setInputFile] = useState<File | null>(null);
	const [outputFileURL, setOutputFileURL] = useState<string>("");
	const [settings, setSettings] = useState<VideoSettings>(DEFAULT_SETTINGS);
	const [totalDuration, setTotalDuration] = useState<number>(-10);
	const [percentProgress, setPercentProgress] = useState(0);
	const [converting, setConverting] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [useMultithreading, setUseMultithreading] = useState(false);
	const [ffmpegLoading, setFFmpegLoading] = useState(false);

	// Load FFmpeg when component mounts or multithreading changes
	useEffect(() => {
		const loadFFmpeg = async () => {
			setFFmpegLoading(true);
			const baseURL = useMultithreading
				? "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm"
				: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";

			const ffmpeg = ffmpegRef.current;
			ffmpeg.on("log", ({ message }) => {
				parseProgressAndDuration(message);
				setMessage(message);
			});

			const coreConfig: CoreConfig = {
				coreURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.js`,
					"text/javascript",
				),
				wasmURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.wasm`,
					"application/wasm",
				),
			};

			if (useMultithreading) {
				coreConfig.workerURL = await toBlobURL(
					`${baseURL}/ffmpeg-core.worker.js`,
					"text/javascript",
				);
			}

			try {
				await ffmpeg.load(coreConfig);
				setFFmpegLoading(false);
				setLoaded(true);
			} catch (error) {
				console.error("Failed to load FFmpeg:", error);
				setFFmpegLoading(false);
				setErrorMsg(
					"Failed to load FFmpeg. Please try again.\n You may check console for more details.",
				);
			}
		};

		loadFFmpeg();

		// Cleanup function
		return () => {
			const ffmpeg = ffmpegRef.current;
			if (loaded) {
				ffmpeg.terminate();
			}
			// Cleanup any existing output URL
			if (outputFileURL) {
				URL.revokeObjectURL(outputFileURL);
			}
		};
	}, [useMultithreading, loaded, outputFileURL]);

	const parseProgressAndDuration = (message: string) => {
		if (!message || message.length === 0) return;

		if (message.includes("Duration:")) {
			const duration = message.split("Duration:")[1].split(",")[0].trim();
			const [hours, minutes, seconds] = duration.split(":").map(Number);
			const totalDurationInSeconds =
				hours * 3600 + minutes * 60 + Math.floor(seconds);
			setTotalDuration(totalDurationInSeconds);
		}

		if (message.includes("time=")) {
			const time = message.split("time=")[1].split(" ")[0].trim();
			const [hours, minutes, seconds] = time.split(":").map(Number);
			const currentDuration = hours * 3600 + minutes * 60 + Math.floor(seconds);

			setTotalDuration((prevTotalDuration) => {
				if (prevTotalDuration > 0) {
					const progress = Math.min(
						(currentDuration / prevTotalDuration) * 100,
						100,
					);
					setPercentProgress(progress);
				}
				return prevTotalDuration;
			});
		}
	};

	const getFFmpegAttributes = () => {
		const attributes: string[] = [];

		// Add settings that aren't "original"
		if (settings.resolution !== "original")
			attributes.push("-vf", settings.resolution);
		if (settings.constantQuality !== "original")
			attributes.push(...settings.constantQuality.split(" "));
		if (settings.fit !== "original")
			attributes.push(...settings.fit.split(" "));
		if (settings.frameRate !== "original")
			attributes.push("-r", settings.frameRate);
		if (settings.aspectRatio !== "original")
			attributes.push(...settings.aspectRatio.split(" "));
		if (settings.audioCodec !== "original")
			attributes.push(...settings.audioCodec.split(" "));
		if (settings.audioBitrate !== "original")
			attributes.push("-b:v", settings.audioBitrate.replace("-b:v ", ""));
		if (settings.channels !== "original")
			attributes.push(...settings.channels.split(" "));
		if (settings.volume !== "original") attributes.push("-af", settings.volume);
		if (settings.sampleRate !== "original")
			attributes.push(...settings.sampleRate.split(" "));
		if (settings.preset !== "original")
			attributes.push(...settings.preset.split(" "));

		// Format-specific settings
		if (format === "webm") {
			attributes.push("-c:v", "libvpx", "-c:a", "libvorbis");
			if (!attributes.includes("-crf")) {
				attributes.push("-crf", "14");
			}
		}

		return attributes;
	};

	const FFMPEGProcessor = async () => {
		if (!loaded || !inputFile) return;

		try {
			setConverting(true);
			const ffmpeg = ffmpegRef.current;
			await ffmpeg.writeFile(
				`input.${primaryFormat}`,
				await fetchFile(inputFile),
			);

			const attributes = getFFmpegAttributes();
			await ffmpeg.exec([
				"-i",
				`input.${primaryFormat}`,
				...attributes,
				`output.${format}`,
			]);

			const fileData = await ffmpeg.readFile(`output.${format}`);
			const data = new Uint8Array(fileData as unknown as ArrayBuffer);
			const dataBlob = new Blob([data], { type: `video/${format}` });

			if (dataBlob.size > 0) {
				setPercentProgress(100);
				// Cleanup old URL if exists
				if (outputFileURL) {
					URL.revokeObjectURL(outputFileURL);
				}
				const url = URL.createObjectURL(dataBlob);
				setOutputFileURL(url);
			}
		} catch (error) {
			console.error(error);
			setErrorMsg("An error occurred during conversion. Please try again.");
		} finally {
			setConverting(false);
		}
	};

	const resetUpload = () => {
		setConverting(false);
		setInputFile(null);
		if (outputFileURL) {
			URL.revokeObjectURL(outputFileURL);
		}
		setOutputFileURL("");
		setErrorMsg("");
		setSettings(DEFAULT_SETTINGS);
		setPercentProgress(0);
	};

	const handleSettingChange = (key: keyof VideoSettings, value: string) => {
		setSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleAudioBitrateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const bitrate = event.target.value;
		const isValidBitrate = !Number.isNaN(Number(bitrate));
		if (isValidBitrate) {
			handleSettingChange("audioBitrate", `-b:v ${bitrate}k`);
		} else {
			handleSettingChange("audioBitrate", "original");
			setErrorMsg("Please enter a valid bitrate.");
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		if (file?.name.toLowerCase().endsWith(primaryFormat)) {
			setInputFile(file);
			setErrorMsg("");
		} else if (file) {
			setErrorMsg(
				`This is not a valid ${primaryFormat} file. Please select a valid ${primaryFormat} file.`,
			);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setInputFile(e.dataTransfer.files[0]);
		}
	};

	const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const ButtonText = () => {
		if (ffmpegLoading && inputFile) {
			return "Loading...";
		}
		if (converting && !ffmpegLoading) {
			return "Converting...";
		}
		return "Convert";
	};

	return (
		<div className="flex align-middle justify-center flex-col rounded-lg shadow-md border p-2 mt-2">
			<div className="m-2">
				{inputFile === null ? (
					<Label
						htmlFor="dropzone-file"
						className="justify-self-center cursor-pointer"
					>
						<div
							className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 "
							onDragOver={preventDefaults}
							onDragEnter={preventDefaults}
							onDragLeave={preventDefaults}
							onDrop={handleDrop}
						>
							<UploadIcon />
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
								<span className="font-semibold">Click to Select</span> or Drag
								and Drop
							</p>
						</div>
						<Input
							id="dropzone-file"
							type="file"
							accept={`.${primaryFormat}`}
							className="hidden"
							onChange={handleFileChange}
						/>
					</Label>
				) : (
					<div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 border-teal-500">
						<p className=" text-lg font-semibold text-gray-500 dark:text-gray-400  text-center">
							{inputFile?.name.length <= 23
								? inputFile?.name
								: `${inputFile?.name.substring(
										0,
										15,
									)}....${inputFile?.name.substring(
										inputFile?.name.length - 5,
									)}`}
						</p>
						{converting === false ? (
							<Button
								variant={"ghost"}
								onClick={resetUpload}
								className="opacity-50"
								disabled={converting}
							>
								Choose a different video
							</Button>
						) : (
							<ChangeFileAlertDialog
								resetUpload={resetUpload}
								fileType="video"
							/>
						)}
					</div>
				)}
			</div>
			{errorMsg && !converting && outputFileURL === "" && (
				<div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform ease-in-out">
					{errorMsg}
				</div>
			)}
			<div className={"flex flex-col space-y-6 m-2 border p-5 rounded-lg"}>
				<div className={`${converting && inputFile ? "blur disabled" : ""}`}>
					<h2 className="flex items-center text-xl font-semibold">
						<FilmIcon className="mr-2 text-gray-600" />
						Video
					</h2>
					<div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Resolution{" "}
								<InfoTooltip information="The resolution determines the amount of detail (pixels) and clarity of the video or image.Generally, higher the pixels higher the quality" />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("resolution", value)
								}
							>
								<SelectTrigger id="resolution">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>

										<Separator />
										<SelectItem value="scale=426:240">
											240p (426x240)
										</SelectItem>
										{/* Scale to 426x240 */}
										<SelectItem value="scale=640:480">
											480p (640x480)
										</SelectItem>
										{/* Scale to 640x480 */}
										<SelectItem value="scale=1280:720">
											720p (1280x720)
										</SelectItem>
										{/* Scale to 1280x720 */}
										<SelectItem value="scale=1920:1080">
											1080p (1920x1080)
										</SelectItem>
										{/* Scale to 1920x1080 */}
										<SelectItem value="scale=2560:1440">
											1440p (2560x1440)
										</SelectItem>
										{/* Scale to 2560x1440 */}
										<SelectItem value="scale=3840:2160">
											2160p (3840x2160)
										</SelectItem>
										{/* Scale to 3840x2160 */}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Constant Quality (CRF)
								<InfoTooltip information=" The CRF value sets the video quality. Lower values mean better quality but longer conversion times" />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("constantQuality", value)
								}
							>
								<SelectTrigger id="crf">
									<SelectValue placeholder="23 (Normal) | Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>

										<Separator />
										<SelectItem value="-crf 0">0 (Lossless)</SelectItem>
										<SelectItem value="-crf 18">18 (High Quality)</SelectItem>
										<SelectItem value="-crf 23">23 (Normal)</SelectItem>
										<SelectItem value="-crf 28">28 (Low Quality)</SelectItem>
										<SelectItem value="-crf 51">51 (Worst Quality)</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Fit | Crop{" "}
								<InfoTooltip information="Sets the mode of sizing the video." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("fit", value)
								}
							>
								<SelectTrigger id="fit">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>
										<Separator />
										<SelectItem value="-vf scale=-2:1080">
											Scale (to 1080p, maintain aspect ratio)
										</SelectItem>
										<SelectItem value="-filter:v crop=in_h*9/16:in_h:(in_w-in_h*9/16)/2:0">
											Crop Vertically (to 16:9) - Ideal for Mobiles
										</SelectItem>
										<SelectItem value="-filter:v crop=in_h/2:in_h:(in_w-in_h/2)/2:0">
											Crop Vertically (to 9:18) - Ideal for Mobiles
										</SelectItem>
										<SelectItem value="-vf pad=1920:1080:-1:-1:color=black">
											Pad (to 1920x1080, with black bars)
										</SelectItem>
										<SelectItem value="-vf pad=1920:1080:-1:-1:color=white">
											Pad (to 1920x1080, with white bars)
										</SelectItem>
										<SelectItem value="-vf pad=1920:960:-1:-1:color=black">
											Pad (to 1920x960 : 18:9, with black bars)
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Aspect Ratio{" "}
								<InfoTooltip information="Aspect ratio refers to the proportional relationship between the width and height of a video or image. The choice of aspect ratio affects how content is displayed on various devices and screens." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("aspectRatio", value)
								}
							>
								<SelectTrigger id="fit">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>

										<Separator />
										<SelectItem value="-aspect 16:9">16:9 - Normal</SelectItem>
										<SelectItem value="-aspect 4:3">
											4:3 - WideScreen
										</SelectItem>
										<SelectItem value="-aspect 21:9">
											21:9 - Cinematic
										</SelectItem>
										<SelectItem value="-aspect 1:1">1:1 - Square</SelectItem>
										<SelectItem value="-aspect 9:16">
											9:16 - Portrait
										</SelectItem>
										<SelectItem value="-aspect 9:18">
											9:18 - Portrait (Better for Mobiles)
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								FPS (Frame Rate){" "}
								<InfoTooltip information="FPS-Frames Per Second. 60fps - Smooth, 30fps - Most Commonly used, 24 - For Cinema." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("frameRate", value)
								}
							>
								<SelectTrigger id="fps">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>

										<Separator />
										<SelectItem value="30">30 FPS</SelectItem>
										<SelectItem value="24">24 FPS </SelectItem>
										<SelectItem value="25">25 FPS </SelectItem>
										<SelectItem value="60">60 FPS </SelectItem>
										<SelectItem value="120">120 FPS</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Preset{" "}
								<InfoTooltip information="The preset does not directly affect the visual quality in terms of resolution or color accuracy but impacts how the video data is compressed during encoding. Use when time is crucial." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("preset", value)
								}
							>
								<SelectTrigger id="preset">
									<SelectValue placeholder="Unchanged | Default (Medium)" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>
										<Separator />
										<SelectItem value="-preset ultrafast">Ultrafast</SelectItem>
										<SelectItem value="-preset superfast">Superfast</SelectItem>
										<SelectItem value="-preset veryfast">Veryfast</SelectItem>
										<SelectItem value="-preset faster">Faster</SelectItem>
										<SelectItem value="-preset fast">Fast</SelectItem>
										<SelectItem value="-preset medium">Medium</SelectItem>
										<SelectItem value="-preset slow">Slow</SelectItem>
										<SelectItem value="-preset slower">Slower</SelectItem>
										<SelectItem value="-preset veryslow">Veryslow</SelectItem>
										<SelectItem value="-preset placebo">Placebo</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<Separator />
				<div className={`${converting && inputFile ? "blur disabled" : ""}`}>
					<h2 className="flex items-center text-xl font-semibold">
						<MusicIcon className="mr-2 text-gray-600" />
						Audio
					</h2>
					<div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Audio Codec{" "}
								<InfoTooltip information="The audio codec is a type of program used to compress and decompress digital audio files. Common codecs include AAC for a balance of quality and compatibility." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("audioCodec", value)
								}
							>
								<SelectTrigger id="audio-codec">
									<SelectValue placeholder="AAC" />
								</SelectTrigger>
								<SelectGroup>
									<SelectContent>
										<SelectItem value="original" className="font-bold">
											Original
										</SelectItem>
										<Separator />
										<SelectItem value="-c:a aac">AAC</SelectItem>{" "}
										{/* Use AAC codec */}
										<Separator />
										<SelectItem value="-c:a copy">COPY</SelectItem>{" "}
										{/* Copy the original audio stream */}
										<SelectItem value="-an">NONE (No Audio)</SelectItem>{" "}
										{/* Remove audio stream */}
									</SelectContent>
								</SelectGroup>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Audio Bitrate{" "}
								<InfoTooltip information="Bitrate refers to the amount of audio data transmitted per second, measured in kilobits per second (kbps). Higher bitrates generally result in better sound quality but larger file sizes. Typical values range from 128 kbps (good for podcasts) to 320 kbps (high quality for music)." />
							</strong>
							<Input
								placeholder="Enter bitrate (e.g. 128 kbps)"
								onChange={(event) => handleAudioBitrateChange(event)}
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
							/>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Channel{" "}
								<InfoTooltip information="Audio channels refer to the number of separate audio signals in a recording, affecting how sound is heard. 'Mono' has one channel and sounds the same from all speakers, while 'Stereo' uses two channels for left and right speakers, offering a sense of dimension and direction in the sound." />
							</strong>
							<Select
								// biome-ignore lint/suspicious/noExplicitAny: <explanation>
								onValueChange={(value: string) =>
									handleSettingChange("channels", value)
								}
							>
								<SelectTrigger id="channels">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="original" className="font-bold">
										Original
									</SelectItem>

									<Separator />
									<SelectItem value="-ac 2">Stereo</SelectItem>
									<SelectItem value="-ac 1">Mono</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Volume{" "}
								<InfoTooltip information="Volume in refers to the loudness or intensity of the sound." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("volume", value)
								}
							>
								<SelectTrigger id="volume">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="volume=1.5">+50%</SelectItem>
									<SelectItem value="volume=1.2">+20%</SelectItem>
									<SelectItem value="volume=1.1">+10%</SelectItem>
									<Separator />
									<SelectItem value="original" className="font-bold">
										Original
									</SelectItem>
									<Separator />
									<SelectItem value="volume=0.9">-10%</SelectItem>
									<SelectItem value="volume=0.8">-20%</SelectItem>
									<SelectItem value="volume=0.5">-50%</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col">
							<strong
								onClick={(event) => event.preventDefault()}
								onKeyDown={(event) => event.preventDefault()}
								onKeyUp={(event) => event.preventDefault()}
								className="font-medium flex align-middle p-3 items-center justify-between"
							>
								Sample Rate{" "}
								<InfoTooltip information="Sample rate, measured in Hertz (Hz), refers to the number of samples of audio carried per second. Higher sample rates can capture more detail but require more data. Common rates include 44.1 kHz (CD quality) and 48 kHz (professional audio and video standards)." />
							</strong>
							<Select
								onValueChange={(value: string) =>
									handleSettingChange("sampleRate", value)
								}
							>
								<SelectTrigger id="sample-rate">
									<SelectValue placeholder="Unchanged" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="original" className="font-bold">
										Original
									</SelectItem>

									<Separator />
									<SelectItem value="-ar 44100">44100 Hz</SelectItem>
									<SelectItem value="-ar 48000">48000 Hz</SelectItem>
									<SelectItem value="-ar 96000">96000 Hz</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</div>
			<div className="p-5 grid grid-cols-1 items-center gap-5 border m-2 rounded-lg">
				<Progress value={percentProgress} className="text-grey-500" />
				<div className="flex items-center space-x-2">
					<Switch
						id="use-multithreading"
						checked={useMultithreading}
						onCheckedChange={() => setUseMultithreading((prev) => !prev)}
					/>
					<Label htmlFor="use-multithreading">Use Multithreading</Label>
					<InfoTooltip information="Multithreading, in general will take less time but will consume high amount of RAM and resources." />		
				</div>
				<div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-3 items-center">
					<Button
						onClick={FFMPEGProcessor}
						disabled={inputFile === null || converting === true}
						className="text-md"
					>
						<ButtonText />
					</Button>
					{outputFileURL !== "" && (
						<a
							href={outputFileURL}
							download={`${inputFile?.name.slice(
								0,
								Number((format.length + 1) * -1),
							)}.${format}`}
							className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
						>
							Download <Download size={15} className="ml-2" />
						</a>
					)}
					{outputFileURL !== "" && (
						<Button
							onClick={resetUpload}
							className="text-md"
							variant={"outline"}
						>
							Convert Another
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
