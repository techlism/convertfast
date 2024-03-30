
import { SelectValue, SelectTrigger, SelectContent, Select, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
// import { Label } from "./ui/label"
import InfoTooltip from "./InfoTooltip"
import { FilmIcon, MusicIcon, ScissorsIcon } from "lucide-react"
import { useState } from "react";
import { Separator } from "./ui/separator";

export default function VideoProperties() {
    const [resolution, setResolution] = useState<string>("Original");
    const [aspectRatio, setAspectRatio] = useState<string>("Maintain original ratio");
    const [constantQuality, setConstantQuality] = useState<string>("23");
    const [videoCodec, setVideoCodec] = useState<string>("x264");
    const [fit, setFit] = useState<string>("scale");
    const [frameRate, setFrameRate] = useState<Number>(30);
    const [audioCodec, setAudioCodec] = useState<string>("copy");
    const [audioBitrate, setAudioBitrate] = useState<string>("128 kbps");
    const [channels, setChannels] = useState<string>("stereo");
    const [volume, setVolume] = useState<string>("Unchanged");
    const [sampleRate, setSampleRate] = useState<string>("Original sample rate");
    const [trimStart, setTrimStart] = useState<string>("");
    const [trimEnd, setTrimEnd] = useState<string>("");

    function handleResolutionChange(value : string) {
        setResolution(value);    }
    
    function handleAspectRatioChange(value : string) {
        setAspectRatio(value);
    }
    
    function handleConstantQualityChange(value : string) {
        setConstantQuality(value);
    }
    
    function handleVideoCodecChange(value : string) {
        setVideoCodec(value);
    }
    
    function handleFitChange(value : string) {
        setFit(value);
    }
    
    function handleFrameRateChange(value : Number) {
        setFrameRate(value);
    }
    
    function handleAudioCodecChange(value : string) {
        setAudioCodec(value);
    }
    
    function handleAudioBitrateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAudioBitrate(event.target.value);
    }
    
    function handleChannelsChange(value : string) {
        setChannels(value);
    }
    
    function handleVolumeChange(value : string) {
        setVolume(value);
    }
    
    function handleSampleRateChange(value : string) {
        setSampleRate(value);
    }
    
    function handleTrimStartChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTrimStart(event.target.value);
    }
    
    function handleTrimEndChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTrimEnd(event.target.value);
    }    
    return (
    <div className="flex align-middle justify-center">
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="flex items-center text-xl font-semibold">
            <FilmIcon className="mr-2 text-gray-600" />
            Video
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">Resolution <InfoTooltip information="Resolution"/> </label>
              <Select onValueChange={(value)=>handleResolutionChange(value)}>
                <SelectTrigger id="resolution">
                  <SelectValue placeholder="Original" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Original</SelectLabel>
                    <SelectItem value="426x240">240p (426x240)</SelectItem>
                    <SelectItem value="640x480">480p (640x480)</SelectItem>
                    <SelectItem value="1280x720">720p (1280x720)</SelectItem>
                    <SelectItem value="1920x1080">1080p (1920x1080)</SelectItem>
                    <SelectItem value="2560x1440">1440p (2560x1440)</SelectItem>
                    <SelectItem value="3840x2160">2160p (3840x2160)</SelectItem>                                        
                    </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Aspect Ratio <InfoTooltip information="Aspect Ratio"/> </label>
              <Select>
                <SelectTrigger id="aspect-ratio">
                  <SelectValue placeholder="Maintain original ratio" />
                </SelectTrigger>
                <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Original</SelectLabel>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>                    
                    </SelectGroup>                   
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Constant Quality (CRF) <InfoTooltip information="Constant Quality (CRF)"/> </label>
            <Select onValueChange={(value)=>handleConstantQualityChange(value)}>
                <SelectTrigger id="crf">
                <SelectValue placeholder="23 (Normal)" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="0">0 (Lossless)</SelectItem>
                        <SelectItem value="18">18 (High Quality)</SelectItem>
                        <SelectItem value="23">23 (Normal)</SelectItem>
                        <SelectItem value="28">28 (Low Quality)</SelectItem>
                        <SelectItem value="51">51 (Worst Quality)</SelectItem>
                    </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
                <label className="font-medium flex align-middle p-3 justify-between">Video Codec <InfoTooltip information="Video Codec"/> </label>
                <Select onValueChange={(value)=>handleVideoCodecChange(value)}>
                <SelectTrigger id="video-codec">
                <SelectValue placeholder="x264"/> 
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="x264">x264</SelectItem>
                        <SelectItem value="x265">x265</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Fit <InfoTooltip information="Fit"/> </label>
              <Select onValueChange={(value)=>handleFitChange(value)}>
                <SelectTrigger id="fit">
                  <SelectValue placeholder="Scale" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="scale">Scale</SelectItem>
                        <SelectItem value="max">Max</SelectItem>
                        <SelectItem value="crop">Crop</SelectItem>
                        <SelectItem value="pad">Pad</SelectItem>
                    </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">FPS (Frame Rate) <InfoTooltip information="FPS (Frame Rate)"/> </label>
              <Select onValueChange={(value)=>handleFrameRateChange(Number(value))}>
                <SelectTrigger id="fps">
                  <SelectValue placeholder="30 fps" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30">30</SelectItem>
                      <Separator/>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="120">120</SelectItem>                        
                    </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Separator/>
        <div>
          <h2 className="flex items-center text-xl font-semibold">
            <MusicIcon className="mr-2 text-gray-600" />
            Audio
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Audio Codec <InfoTooltip information="Audio Codec"/> </label>
              <Select onValueChange={(value)=>handleAudioCodecChange(value)}>
                <SelectTrigger id="audio-codec">
                  <SelectValue placeholder="AAC" />
                </SelectTrigger>
                <SelectGroup>
                  <SelectContent>
                    <SelectItem value="aac">AAC</SelectItem>
                    <Separator/>
                    <SelectItem value="copy">COPY</SelectItem>
                    <SelectItem value="none">NONE</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Audio Bitrate <InfoTooltip information="Audio Bitrate"/> </label>
              <Input placeholder="128 kbps" onChange={(event)=>handleAudioBitrateChange(event)}/>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Channel <InfoTooltip information="Channel"/> </label>
              <Select onValueChange={(value)=>handleChannelsChange(value)}>
                <SelectTrigger id="channels">
                  <SelectValue placeholder="Keep original channels" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="stereo">Stereo</SelectItem>
                    <SelectItem value="mono">Mono</SelectItem>
                    <Separator/>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium flex align-middle p-3 justify-between">Volume <InfoTooltip information="Volume"/> </label>
              <Select>
                <SelectTrigger id="volume">
                  <SelectValue placeholder="Unchanged" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="stereo">Stereo</SelectItem>
                    <SelectItem value="mono">Mono</SelectItem>
                    <Separator/>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Sample Rate <InfoTooltip information="Sample Rate"/> </label>
              <Select>
                <SelectTrigger id="sample-rate">
                  <SelectValue placeholder="Original sample rate" />
                </SelectTrigger>
                <SelectContent position="popper" />
              </Select>
            </div>
          </div>
        </div>
        <Separator/>
        <div>
          <h2 className="flex items-center text-xl font-semibold">
            <ScissorsIcon className="mr-2 text-gray-600" />
            Trim
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xl:gap-14 lg:gap-12 md:gap-8 gap-6 items-center">            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Trim Start <InfoTooltip information="Trim Start"/> </label>
              <Input placeholder="Start timestamp (HH:MM:SS)" />
            </div>
            <div className="flex flex-col">
            <label className="font-medium flex align-middle p-3 justify-between">Trim End <InfoTooltip information="Trim End"/> </label>
              <Input placeholder="End timestamp (HH:MM:SS)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


