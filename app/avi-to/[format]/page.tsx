'use client'
import HeroSection from "@/components/Video-Hero";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoProperties";
import { Home } from "lucide-react";
import { MoveDown } from 'lucide-react';
import Link from "next/link";

const supportedFormats = ['mkv', 'mp4', 'flv', 'webm', 'mov'];
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
                    Click here to see all the supported format conversions.
                    <div className="flex justify-center">
                        <Link href={'#footer'} className="mt-5 border rounded-lg flex p-5"><MoveDown/><span className="sr-only">Go to Footer</span></Link>
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