import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import { Home } from "lucide-react";
import Link from "next/link";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata } from "next";

const supportedFormats = ['mkv', 'avi', 'mp4', 'webm', 'mov'];
const primaryFormat = 'flv';

export const metadata : Metadata = {
    title: "Convert FLV to MP4, MOV, AVI, WebM, MKV & More Formats Online",   
    description: "Convert FLV to MP4, MOV, AVI, WebM, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert flv to mp4", "convert flv to mov", "convert flv to avi", "convert flv to webm", "convert flv to mkv", "flv to mp4", "flv to mov", "flv to avi", "flv to webm", "flv to mkv", "flv to mp4 online", "flv to mov online", "flv to avi online", "flv to webm online", "flv to mkv online", "flv to mp4 converter", "flv to mov converter", "flv to avi converter", "flv to webm converter", "flv to mkv converter"],
    creator : "Techlism"
}

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
            <UnsupportedFormat/>
        )
    }        
    if(!supportedFormats.includes(format?.toLowerCase())){
        return (
            <UnsupportedFormat/>
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