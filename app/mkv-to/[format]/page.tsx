import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata } from "next";

const supportedFormats = ['mp4', 'avi', 'flv', 'webm', 'mov'];
const primaryFormat = 'mkv'

export const metadata : Metadata = {
    title: "Convert MKV to MP4, MOV, AVI, WebM & More Formats Online",   
    description: "Convert MKV to MP4, MOV, AVI, FLV, WebM and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert mkv to mp4", "convert mkv to mov", "convert mkv to avi", "convert mkv to flv", "convert mkv to webm", "mkv to mp4", "mkv to mov", "mkv to avi", "mkv to flv", "mkv to webm", "mkv to mp4 online", "mkv to mov online", "mkv to avi online", "mkv to flv online", "mkv to webm online", "mkv to mp4 converter", "mkv to mov converter", "mkv to avi converter", "mkv to flv converter", "mkv to webm converter"],
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
                    <HeroSection format={format} primaryFormat={primaryFormat} />            
                    <VideoProperties format = {format} primaryFormat={primaryFormat}/>
                </div>
            </NOSSRWrapper>            
        </main>
    )
}