'use client'
import HeroSection from "@/components/Video-Hero";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoProperties";
import { Home } from "lucide-react";
import Link from "next/link";

const supportedFormats = ['mkv', 'avi', 'flv', 'webm', 'mov'];
const primaryFormat = 'avi';

export default function Page({ params }: { params: { format: string } }){
    const {format} = params;
    if(format === "" || format === undefined){
        return (
            <main className="flex  justify-center align-middle min-h-screen m-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">No format specified</h1>         
                </div>
            </main>
        )
    }
    if(format === primaryFormat){
        return (
            <main className="flex justify-center items-center min-h-screen p-4 border rounded-lg auto-gradient">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Invalid Format</h1>
                    <p className="text-lg">You are trying to convert into the same format</p>
                </div>
                <div>
                    <p>Here are the available formats for conversion.</p>
                    <div>
                        <Link href={'/mp4-to-mkv'}>MP4 to MKV</Link>
                    </div>
                </div>
            </main>
        )
    }        
    if(!supportedFormats.includes(format?.toLowerCase())){
        return (
            <main className="flex flex-col justify-center items-center min-h-screen p-4 space-y-5 auto-gradient">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Unsupported Format</h1>
                    <p className="text-lg mt-2">The format you are trying to convert to is not yet supported or it is an invalid file format</p>              
                </div>
                <div>          
                    <p className="text-lg mb-5 text-center">Here are the available formats for conversion.</p>          
                    <div className="space-x-4 flex flex-wrap">
                        <Link href={'/mp4-to-mkv'} className="p-4 border rounded-lg text-pretty font-medium text-lg">MP4 to MKV</Link>
                        <Link href={'/mp4-to-avi'} className="p-4 border rounded-lg text-pretty font-medium text-lg">MP4 to AVI</Link>
                        <Link href={'/mp4-to-flv'} className="p-4 border rounded-lg text-pretty font-medium text-lg">MP4 to FLV</Link>
                        <Link href={'/mp4-to-webm'} className="p-4 border rounded-lg text-pretty font-medium text-lg">MP4 to WEBM</Link>                            
                        <Link href={'/mp4-to-mov'} className="p-4 border rounded-lg text-pretty font-medium text-lg">MP4 to MOV</Link>                            
                    </div>
                    <div className="flex justify-center">
                        <Link href={'/'} className="mt-5 border rounded-lg flex p-5"><Home/><span className="sr-only">Back to Home</span></Link>
                    </div>
                </div>                
            </main>
        )
    }


    return (
        <main className="flex justify-center align-middle items-center min-h-screen m-4">
        <NOSSRWrapper>
            <div>
                <HeroSection format={format} primaryFormat={primaryFormat}/>            
                <VideoProperties format = {format} primaryFormat={primaryFormat}/>
            </div>

        </NOSSRWrapper>            
        </main>
    )
}