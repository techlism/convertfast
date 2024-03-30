'use client'

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useEffect, useRef, useState } from 'react'


export default function Converter() {
  const [loaded, setLoaded] = useState(false)
  const ffmpegRef = useRef(new FFmpeg())
  const [message, setMessage] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputFileURL, setOutputFileURL] = useState<string>('')

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

  const FFMPEGProcessor = async () => {
    const ffmpeg = ffmpegRef.current
    if (inputFile) {
      await ffmpeg.writeFile('input.mp4', await fetchFile(inputFile))
      await ffmpeg.exec(['-i', 'input.mp4', 'output.avi'])
      const fileData = await ffmpeg.readFile('output.avi');
      const data = new Uint8Array(fileData as ArrayBuffer);
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/avi' }));
      setOutputFileURL(url);
      // setInputFile(null);
    }
  }

  useEffect(() => {
    if(!loaded) load();
  }, [loaded])

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <input type="file" onChange={(event) => setInputFile(event.target.files && event.target.files.length > 0 ? event.target.files[0] : null)} accept='video/mp4'/>
        {inputFile && <video controls src={URL.createObjectURL(inputFile)}/>}
        {outputFileURL !== '' &&  <a href={outputFileURL} download="output.avi">Download</a>}
      <br />
      <button
        onClick={FFMPEGProcessor}
        className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded"
        // disabled = {loaded}
      >
        Convert Mp4 to AVI
      </button>
      <p>{message}</p>
    </div>
  )
}

