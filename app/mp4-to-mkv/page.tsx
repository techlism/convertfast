'use client'
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadIcon } from "lucide-react";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import { FFmpeg} from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import VideoProperties from "@/components/VideoProperties";

export default function Home(){    
    const [loaded, setLoaded] = useState(false)
    const ffmpegRef = useRef(new FFmpeg())
    const [message, setMessage] = useState('');
    const [inputFile, setInputFile] = useState<File | null>(null)
    const [outputFileURL, setOutputFileURL] = useState<string>('');
    const load = async () => {  
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
        const ffmpeg = ffmpegRef.current
        ffmpeg.on('log', ({ message }) => {
          setMessage(message);
        })
        const ffmpegLoaded = await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`,"application/wasm"),
          workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`,"text/javascript")
        })
        if(ffmpegLoaded) setLoaded(true);
    }    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setInputFile(file);
    }
    
    const FFMPEGProcessor = async () => {
        const ffmpeg = ffmpegRef.current
        if (inputFile) {
          await ffmpeg.writeFile('input.mp4', await fetchFile(inputFile))
          await ffmpeg.exec(['-i', 'input.mp4', 'output.avi'])
          const fileData = await ffmpeg.readFile('output.avi');
          const data = new Uint8Array(fileData as ArrayBuffer);
          const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/avi' }));
          setOutputFileURL(url);
        }
    }    

    useEffect(() => {
        if(!loaded) load();
    }, [loaded])

    return (
        <NOSSRWrapper>
            <main className="flex flex-col justify-center align-middle min-h-screen m-4">
                <Label htmlFor="dropzone-file" className="m-5 justify-self-center cursor-pointer">
                    <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-10">
                        <UploadIcon/>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or Drag and Drop</p>
                    </div>
                    <Input id="dropzone-file" type="file" accept='video/mp4' className="hidden" onChange={handleFileChange} />
                </Label>
                <VideoProperties/>
            </main>
        </NOSSRWrapper>
    )
}