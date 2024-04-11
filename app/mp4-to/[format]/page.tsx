import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata } from "next";

const supportedFormats = ['mkv', 'avi', 'flv', 'webm', 'mov'];
const primaryFormat = 'mp4';

export const metadata : Metadata = {
    title: "Convert MP4 to MKV, AVI, FLV, WebM & More Formats Online",   
    description: "Convert MP4 to MKV, AVI, FLV, WebM, MOV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert mp4 to mkv", "convert mp4 to avi", "convert mp4 to flv", "convert mp4 to webm", "convert mp4 to mov", "mp4 to mkv", "mp4 to avi", "mp4 to flv", "mp4 to webm", "mp4 to mov", "mp4 to mkv online", "mp4 to avi online", "mp4 to flv online", "mp4 to webm online", "mp4 to mov online", "mp4 to mkv converter", "mp4 to avi converter", "mp4 to flv converter", "mp4 to webm converter", "mp4 to mov converter"],
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
    if(format.toLowerCase() === primaryFormat){
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