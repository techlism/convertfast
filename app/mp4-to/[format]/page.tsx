'use client'
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoProperties";
import { Home } from "lucide-react";
import Link from "next/link";

const supportedFormats = ['mkv', 'avi', 'flv', 'webm', 'mov'];

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
    if(format === 'mp4'){
        return (
            <main className="flex justify-center items-center min-h-screen p-4 border rounded-lg">
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
            <main className="flex flex-col justify-center items-center min-h-screen p-4 space-y-5">
                <div>
                    <h1 className="text-4xl font-bold">Unsupported Format</h1>
                    <p className="text-lg">The format you are trying to convert to is not yet supported or it is an invalid file format</p>              
                </div>
                <div>          
                    <p className="text-lg mb-5">Here are the available formats for conversion.</p>          
                    <div className="space-x-4">
                        <Link href={'/mp4-to-mkv'} className="p-4 border rounded-lg text-pretty bg-destructive-foreground font-medium text-lg">MP4 to MKV</Link>
                        <Link href={'/mp4-to-avi'} className="p-4 border rounded-lg text-pretty bg-destructive-foreground font-medium text-lg">MP4 to AVI</Link>
                        <Link href={'/mp4-to-flv'} className="p-4 border rounded-lg text-pretty bg-destructive-foreground font-medium text-lg">MP4 to FLV</Link>
                        <Link href={'/mp4-to-webm'} className="p-4 border rounded-lg text-pretty bg-destructive-foreground font-medium text-lg">MP4 to WEBM</Link>                            
                    </div>
                    <Link href={'/'} className="mt-5 border rounded-lg flex p-5 max-w-fit"><Home/>Back to Home</Link>
                </div>                
            </main>
        )
    }


    return (
        <main className="flex justify-center align-middle min-h-screen m-4">
        <NOSSRWrapper>
            <VideoProperties format = {format}/>
        </NOSSRWrapper>            
        </main>
    )
}