'use client'
import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
const supportedFormats = ['mp4', 'avi', 'flv', 'webm', 'mov'];
const primaryFormat = 'mkv'

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