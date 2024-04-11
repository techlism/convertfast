'use client'
import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata } from "next";
const supportedFormats = ['mkv', 'avi', 'flv', 'webm', 'mp4'];
const primaryFormat = 'mov' ;

export const metadata : Metadata = {
    title: "Convert MOV to MP4, AVI, FLV, WebM & More Formats Online",   
    description: "Convert MOV to MP4, AVI, FLV, WebM, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert mov to mp4", "convert mov to avi", "convert mov to flv", "convert mov to webm", "convert mov to mkv", "mov to mp4", "mov to avi", "mov to flv", "mov to webm", "mov to mkv", "mov to mp4 online", "mov to avi online", "mov to flv online", "mov to webm online", "mov to mkv online", "mov to mp4 converter", "mov to avi converter", "mov to flv converter", "mov to webm converter", "mov to mkv converter", "upload MOV to Instagram", "upload MOV to tiktok", "convert apple videos to mp4"],
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