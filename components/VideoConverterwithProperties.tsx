"use client";
import { useEffect, useRef, useState } from "react";
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
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "./ui/progress";
import { Input } from "@/components/ui/input";
// import { Label } from "./ui/label"
import InfoTooltip from "./InfoTooltip";
import { FilmIcon, MusicIcon, ScissorsIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


export default function VideoProperties({format, primaryFormat}: {format: string, primaryFormat: string}) {

  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [message, setMessage] = useState("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  // From the ffmpeg snippet ^
  const [resolution, setResolution] = useState<string>("original");
  const [aspectRatio, setAspectRatio] = useState<string>("original");
  const [constantQuality, setConstantQuality] = useState<string>("original");
  // const [videoCodec, setVideoCodec] = useState<string>("original");
  const [frameRate, setFrameRate] = useState<string>("original");
  const [audioCodec, setAudioCodec] = useState<string>("original");
  const [audioBitrate, setAudioBitrate] = useState<string>("original");
  const [channels, setChannels] = useState<string>("original");
  const [volume, setVolume] = useState<string>("original");
  const [sampleRate, setSampleRate] = useState<string>("original");
  const [fit, setFit] = useState<string>("original");
  const [totalDuration, setTotalDuration] = useState<number>(-10);
  const [percentProgress, setPercentProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const FFMPEGProcessor = async () => {
    const fps = frameRate === "original" ? [frameRate] : ["-r", frameRate];
    const crf =
      constantQuality === "original"
        ? [constantQuality]
        : constantQuality.split(" ");
    const audioBR =
      audioBitrate === "original" ? [audioBitrate] : audioBitrate.split(" ");
    const res = resolution === "original" ? [resolution] : ["-vf", resolution];
    // Video codec doesn't seems to working. Got stuck after thread creation
    // const codec = videoCodec === "original" ? [videoCodec] : videoCodec.split(" ");
    const fitScale = fit === "original" ? [fit] : fit.split(" ");
    const aspect =
      aspectRatio === "original" ? [aspectRatio] : aspectRatio.split(" ");
    const channel = channels === "original" ? [channels] : channels.split(" ");
    const codec =
      audioCodec === "original" ? [audioCodec] : audioCodec.split(" ");
    const vol = volume === "original" ? [volume] : ["-af", volume];
    const sr = sampleRate === "original" ? [sampleRate] : sampleRate.split(" ");
    const attributes = [
      ...crf,
      ...fitScale,
      ...fps,
      ...codec,
      ...audioBR,
      ...channel,
      ...vol,
      ...sr,
      ...res,
      ...aspect,
    ];
	if(format === "webm"){
		attributes.push("-c:v", "libvpx", "-c:a", "libvorbis");
		if(attributes.indexOf("-crf") === -1) attributes.push("-crf", "14");
	}
    const appliedAttributes = attributes.filter(
      (attribute) => attribute !== "original"
    );
    // console.log(appliedAttributes);
    const ffmpeg = ffmpegRef.current;
    if (inputFile) {
      await ffmpeg
        .writeFile(`input.${primaryFormat}`, await fetchFile(inputFile))
        .then(() => setConverting(true));
      await ffmpeg
        .exec(["-i", `input.${primaryFormat}`, ...appliedAttributes, `output.${format}`]);
	  setConverting(false);		
      const fileData = await ffmpeg.readFile(`output.${format}`);
      const data = new Uint8Array(fileData as ArrayBuffer);
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: `video/${format}` })
      );
      setOutputFileURL(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
		// Set the first file to your state variable
		setInputFile(e.dataTransfer.files[0]);
    }
  };
  const resetUpload = () => {
    setInputFile(null);
    setOutputFileURL("");
    setErrorMsg("");
    setAspectRatio("original");
    setResolution("original");
    setConstantQuality("original");
    setFit("original");
    setFrameRate("original");
    setAudioCodec("original");
    setAudioBitrate("original");
    setChannels("original");
    setVolume("original");
    setSampleRate("original");
    setPercentProgress(0);
    setTotalDuration(-10);
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }; 

  function handleFitChange(value: string) {
    setFit(value);
  }

  function handleResolutionChange(value: string) {
    setResolution(value);
  }

  function handleAspectRatioChange(value: string) {
    setAspectRatio(value);
  }

  function handleConstantQualityChange(value: string) {
    setConstantQuality(value);
  }

  function handleFrameRateChange(value: string) {
    setFrameRate(value);
  }

  function handleAudioCodecChange(value: string) {
    setAudioCodec(value);
  }

  function handleAudioBitrateChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const bitrate = event.target.value;
    const isValidBitrate = !isNaN(Number(bitrate));
    if (isValidBitrate) {
      setAudioBitrate(`-b:v ${bitrate}k`);
    }
  }

  function handleChannelsChange(value: string) {
    setChannels(value);
  }

  function handleVolumeChange(value: string) {
    setVolume(value);
  }

  function handleSampleRateChange(value: string) {
    setSampleRate(value);
  }

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0] || null;
      // file?.name && console.log(file.name);
      if (file && file.name.toLowerCase().endsWith(primaryFormat)){
        setInputFile(file);
        setErrorMsg("");
      }
      if (file && !file.name.toLowerCase().endsWith(primaryFormat)) {
  		  setErrorMsg(`This is not a valid ${primaryFormat} file. Please select a valid ${primaryFormat} file.`);
  	  }
    };

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {		
      setMessage(message);
	//   console.log(message);
    });
    const ffmpegLoaded = await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      // SharedBufferArray is not supported in the browser (so not possible to use multithreading right now)
      // workerURL: await toBlobURL(
      //   `${baseURL}/ffmpeg-core.worker.js`,
      //   "text/javascript"
      // ),
    });
    if (ffmpegLoaded) setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) load();
  }, [loaded]);

  useEffect(() => {
    function parseProgessAndDuration(message: string) {
      if (message.includes("Duration:")) {
        const duration = message.split("Duration:")[1].split(",")[0].trim();
        const time = duration.split(":");
        const hours = parseInt(time[0]);
        const minutes = parseInt(time[1]);
        const seconds = parseInt(time[2].split(".")[0]);
        setTotalDuration(hours * 3600 + minutes * 60 + seconds);
      }
      if (message.includes("time=")) {
        const time = message.split("time=")[1].split(" ")[0].trim();
        const currentTime = time.split(":");
        const hours = parseInt(currentTime[0]);
        const minutes = parseInt(currentTime[1]);
        const seconds = parseInt(currentTime[2].split(".")[0]);
        const currentDuration = hours * 3600 + minutes * 60 + seconds;
        if (totalDuration > 0) {
          const progress = (currentDuration / totalDuration) * 100;
          setPercentProgress(progress);
        }
      }
    }
    if (message) {
      parseProgessAndDuration(message);
    }
  }, [message]);
  return (
    <div className="flex align-middle justify-center flex-col">
      <div className="m-2">
        {inputFile == null ? (
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
              <span className="font-semibold">Click to Select</span> or Drag and Drop
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
              {inputFile?.name.length <= 23 ? inputFile?.name : `${inputFile?.name.substring(0, 15)}....${inputFile?.name.substring(inputFile?.name.length - 5)}`}
            </p>
            <Button
              variant={"ghost"}
              onClick={() => setInputFile(null)}
              className="text-xs opacity-30 justify-self-end"
            >
              Choose a different video
            </Button>
          </div>
        )}
      </div>
      {errorMsg && (
        <div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform">
          {errorMsg}
        </div>
      )}
      <div className={`flex flex-col space-y-6 m-2 border p-5 rounded-lg `}>
        <div className={`${converting == true ? "blur disabled" : ""}`}>
          <h2 className="flex items-center text-xl font-semibold">
            <FilmIcon className="mr-2 text-gray-600" />
            Video
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">
            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">
                Resolution <InfoTooltip information="The resolution determines the amount of detail (pixels) and clarity of the video or image.Generally, higher the pixels higher the quality" />
              </label>
              <Select onValueChange={(value) => handleResolutionChange(value)}>
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
              <label className="font-medium flex align-middle p-3 justify-between">
                Constant Quality (CRF)
                <InfoTooltip information=" The CRF value sets the video quality. Lower values mean better quality but longer conversion times" />
              </label>
              <Select
                onValueChange={(value) => handleConstantQualityChange(value)}
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
              <label className="font-medium flex align-middle p-3 justify-between">
                Fit <InfoTooltip information="Sets the mode of sizing the video." />
              </label>
              <Select onValueChange={(value) => handleFitChange(value)}>
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
                    <SelectItem value="-vf crop=1920:1080">
                      Crop (to 1920x1080)
                    </SelectItem>
                    <SelectItem value="-vf crop=1080:1080">
                      Crop (to 1080x1080) - Square
                    </SelectItem>
                    <SelectItem value="-vf pad=1920:1080:-1:-1:color=black">
                      Pad (to 1920x1080, with black bars)
                    </SelectItem>
                    <SelectItem value="-vf pad=1920:1080:-1:-1:color=white">
                      Pad (to 1920x1080, with white bars)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">
                Aspect Ratio <InfoTooltip information="Aspect ratio refers to the proportional relationship between the width and height of a video or image. The choice of aspect ratio affects how content is displayed on various devices and screens." />
              </label>
              <Select onValueChange={(value) => handleAspectRatioChange(value)}>
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
              <label className="font-medium flex align-middle p-3 justify-between">
                FPS (Frame Rate) <InfoTooltip information="FPS-Frames Per Second. 60fps - Smooth, 30fps - Most Commonly used, 24 - For Cinema." />
              </label>
              <Select onValueChange={(value) => handleFrameRateChange(value)}>
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
          </div>
        </div>
        <Separator />
        <div className={`${converting == true ? "blur disabled" : ""}`}>
          <h2 className="flex items-center text-xl font-semibold">
            <MusicIcon className="mr-2 text-gray-600" />
            Audio
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">
            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">
                Audio Codec <InfoTooltip information="The audio codec is a type of program used to compress and decompress digital audio files. Common codecs include AAC for a balance of quality and compatibility." />
              </label>
              <Select onValueChange={(value) => handleAudioCodecChange(value)}>
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
              <label className="font-medium flex align-middle p-3 justify-between">
                Audio Bitrate <InfoTooltip information="Bitrate refers to the amount of audio data transmitted per second, measured in kilobits per second (kbps). Higher bitrates generally result in better sound quality but larger file sizes. Typical values range from 128 kbps (good for podcasts) to 320 kbps (high quality for music)." />
              </label>
              <Input
                placeholder="Enter bitrate (e.g. 128 kbps)"
                onChange={(event) => handleAudioBitrateChange(event)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">
                Channel <InfoTooltip information="Audio channels refer to the number of separate audio signals in a recording, affecting how sound is heard. 'Mono' has one channel and sounds the same from all speakers, while 'Stereo' uses two channels for left and right speakers, offering a sense of dimension and direction in the sound." />
              </label>
              <Select onValueChange={(value) => handleChannelsChange(value)}>
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
              <label className="font-medium flex align-middle p-3 justify-between">
                Volume <InfoTooltip information="Volume in refers to the loudness or intensity of the sound." />
              </label>
              <Select onValueChange={(value) => handleVolumeChange(value)}>
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
              <label className="font-medium flex align-middle p-3 justify-between">
                Sample Rate <InfoTooltip information="Sample rate, measured in Hertz (Hz), refers to the number of samples of audio carried per second. Higher sample rates can capture more detail but require more data. Common rates include 44.1 kHz (CD quality) and 48 kHz (professional audio and video standards)." />
              </label>
              <Select onValueChange={(value) => handleSampleRateChange(value)}>
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-3 items-center">
          <Button
            onClick={FFMPEGProcessor}
            disabled={
              loaded == false || inputFile == null || converting == true
            }
            className="text-md"
          >
            {converting == true ? "Converting..." : "Convert"}
          </Button>
          {outputFileURL !== "" && (
            <Button className="bg-blue-600 dark:bg-blue-500 text-gray-200">
            <a
              href={outputFileURL}
              download={`${inputFile?.name.slice(
                0,
                Number((format.length + 1) * -1)
              )}.${format}`}
              className="text-md flex space-x-2 justify-center items-center align-middle"
            >
              Download <Download size={15}/>
            </a>
          </Button>
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