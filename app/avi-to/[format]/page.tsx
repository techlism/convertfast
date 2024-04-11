import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata } from "next";

const supportedFormats = ['mkv', 'mp4', 'flv', 'webm', 'mov'];
const primaryFormat = 'avi';


export const metadata : Metadata = {
    title: "Convert AVI to MP4, MOV & More Formats Online",   
    description: "Convert AVI to MP4, MOV, FLV, WebM, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert avi to mp4", "convert avi to mov", "convert avi to flv", "convert avi to webm", "convert avi to mkv", "avi to mp4", "avi to mov", "avi to flv", "avi to webm", "avi to mkv", "avi to mp4 online", "avi to mov online", "avi to flv online", "avi to webm online", "avi to mkv online", "avi to mp4 converter", "avi to mov converter", "avi to flv converter", "avi to webm converter", "avi to mkv converter"],
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