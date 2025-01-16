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
import InfoTooltip from "./InfoTooltip";
import { MusicIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


export default function AudioConverterWithProperties({format, primaryFormat}: {format: string, primaryFormat: string}) {

  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const [message, setMessage] = useState("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  const [audioCodec, setAudioCodec] = useState<string>("original");
  const [audioBitrate, setAudioBitrate] = useState<string>("original");
  const [channels, setChannels] = useState<string>("original");
  const [volume, setVolume] = useState<string>("original");
  const [sampleRate, setSampleRate] = useState<string>("original");
  const [totalDuration, setTotalDuration] = useState<number>(-10);
  const [percentProgress, setPercentProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // The function that processes the audio file
  const FFMPEGProcessor = async () => {
    if(!loaded) load();
    // "-c:a","copy"
    const channel = channels === "original" ? [channels] : channels.split(" ");
    const codec = audioCodec === "original" ? [audioCodec] : audioCodec.split(" ");
    const vol = volume === "original" ? [volume] : ["-af", volume];
    const sr = sampleRate === "original" ? [sampleRate] : sampleRate.split(" ");
    const audioBR = audioBitrate === "original" ? [audioBitrate] : audioBitrate.split(" ");
    const attributes = [
      ...codec,
      ...channel,
      ...vol,
      ...sr,
        ...audioBR
    ];
    const appliedAttributes = attributes.filter(
      (attribute) => attribute !== "original"
    );
    // console.log(appliedAttributes);
    const ffmpeg = ffmpegRef.current;
    try {
      if (inputFile) {
        await ffmpeg
          .writeFile(`input.${primaryFormat}`, await fetchFile(inputFile))
          .then(() => setConverting(true));
        await ffmpeg
          .exec(["-i", `input.${primaryFormat}`, ...appliedAttributes, `output.${format}`]);
  
        const fileData = await ffmpeg.readFile(`output.${format}`);
        const data = new Uint8Array(fileData as unknown as ArrayBuffer);
        const url = URL.createObjectURL(
          new Blob([data.buffer], { type: `audio/${format}` })
        );		
        setOutputFileURL(()=>{
          setPercentProgress(100);
          setConverting(false);
          return url;
        });
        // setConverting(false);
        // setPercentProgress(100);
      }      
    } catch (error) {
      // console.log(error);      
      setErrorMsg("An error occurred. Please try again.");
      setConverting(false);     
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

  function handleAudioCodecChange(value: string) {
    setAudioCodec(value);
  }

  function handleAudioBitrateChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const bitrate = event.target.value;
    const isValidBitrate = !Number.isNaN(Number(bitrate));
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
      if (file?.name.toLowerCase().endsWith(primaryFormat)){
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!loaded) load();
  }, [loaded, inputFile]);

  useEffect(() => {
    function parseProgessAndDuration(message: string) {
      if (message.includes("Duration:")) {
        const duration = message.split("Duration:")[1].split(",")[0].trim();
        const time = duration.split(":");
        const hours = Number.parseInt(time[0]);
        const minutes = Number.parseInt(time[1]);
        const seconds = Number.parseInt(time[2].split(".")[0]);
        setTotalDuration(hours * 3600 + minutes * 60 + seconds);
      }
      if (message.includes("time=")) {
        const time = message.split("time=")[1].split(" ")[0].trim();
        const currentTime = time.split(":");
        const hours = Number.parseInt(currentTime[0]);
        const minutes = Number.parseInt(currentTime[1]);
        const seconds = Number.parseInt(currentTime[2].split(".")[0]);
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
  }, [message, totalDuration]);
  
  return (
    <div className="flex align-middle justify-center flex-col rounded-lg shadow-md border p-2">
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
              disabled={converting}
            >
              Choose a different audio
            </Button>
          </div>
        )}
      </div>
      {errorMsg && (
        <div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform ease-in-out">
          {errorMsg}
        </div>
      )}
      <div className={"flex flex-col space-y-6 m-2 border p-5 rounded-lg "}>
        <div className={`${converting === true ? "blur disabled" : ""}`}>
          <h2 className="flex items-center text-xl font-semibold">
            <MusicIcon className="mr-2 text-gray-600" />
            Audio
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">
            <div className="flex flex-col">
              <strong onClick={(event)=>event.preventDefault()} onKeyDown={(event)=>event.preventDefault()} onKeyUp={(event)=>event.preventDefault()} className="font-medium flex align-middle p-3 items-center justify-between">
                Audio Codec <InfoTooltip information="An Audio Codec is a software or hardware tool that converts (encodes or decodes) audio data from one format to another." />
              </strong>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
<Select onValueChange={(value : string | any) => handleAudioCodecChange(value)}>
                <SelectTrigger id="audio-codec">
                  <SelectValue placeholder="Unchanged | Selected" />
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
            <strong onClick={(event)=>event.preventDefault()} onKeyDown={(event)=>event.preventDefault()} onKeyUp={(event)=>event.preventDefault()} className="font-medium flex align-middle p-3 items-center justify-between">
              Audio Bitrate <InfoTooltip information="Bitrate refers to the amount of audio data transmitted per second, measured in kilobits per second (kbps). Higher bitrates generally result in better sound quality but larger file sizes. Typical values range from 128 kbps (good for podcasts) to 320 kbps (high quality for music)." />
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
            <strong onClick={(event)=>event.preventDefault()} onKeyDown={(event)=>event.preventDefault()} onKeyUp={(event)=>event.preventDefault()} className="font-medium flex align-middle p-3 items-center justify-between">
              Channel <InfoTooltip information="Audio channels refer to the number of separate audio signals in a recording, affecting how sound is heard. 'Mono' has one channel and sounds the same from all speakers, while 'Stereo' uses two channels for left and right speakers, offering a sense of dimension and direction in the sound." />
              </strong>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
<Select onValueChange={(value : string | any) => handleChannelsChange(value)}>
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
            <strong onClick={(event)=>event.preventDefault()} onKeyDown={(event)=>event.preventDefault()} onKeyUp={(event)=>event.preventDefault()} className="font-medium flex align-middle p-3 items-center justify-between">
            Volume <InfoTooltip information="Volume in refers to the loudness or intensity of the sound." />
              </strong>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
<Select onValueChange={(value : string | any) => handleVolumeChange(value)}>
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
            <strong onClick={(event)=>event.preventDefault()} onKeyDown={(event)=>event.preventDefault()} onKeyUp={(event)=>event.preventDefault()} className="font-medium flex align-middle p-3 items-center justify-between">
            Sample Rate <InfoTooltip information="Sample rate, measured in Hertz (Hz), refers to the number of samples of audio carried per second. Higher sample rates can capture more detail but require more data. Common rates include 44.1 kHz (CD quality) and 48 kHz (professional audio and video standards)." />
              </strong>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
<Select onValueChange={(value : string | any) => handleSampleRateChange(value)}>
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
              loaded === false || inputFile === null || converting === true
            }
            className="text-md"
          >
            {converting === true ? "Converting..." : "Convert"}
          </Button>
          {outputFileURL !== "" && (
            <a
              href={outputFileURL}
              download={`${inputFile?.name.slice(
                0,
                Number((format.length + 1) * -1)
              )}.${format}`}
              className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
            >
              Download <Download size={15} className="ml-2"/>
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
