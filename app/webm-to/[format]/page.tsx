import ConverterHeroSection from "@/components/ConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata, ResolvingMetadata } from "next";

const supportedFormats = ['mkv', 'avi', 'flv', 'mp4', 'mov'];
const primaryFormat = 'webm';

const defaultMetadata : Metadata = {
    title: "Convert WebM to MP4, MOV, AVI, FLV & More Formats Online",   
    description: "Convert WebM to MP4, MOV, AVI, FLV, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert webm to mp4", "convert webm to mov", "convert webm to avi", "convert webm to flv", "convert webm to mkv", "webm to mp4", "webm to mov", "webm to avi", "webm to flv", "webm to mkv", "webm to mp4 online", "webm to mov online", "webm to avi online", "webm to flv online", "webm to mkv online", "webm to mp4 converter", "webm to mov converter", "webm to avi converter", "webm to flv converter", "webm to mkv converter"],
    creator : "Techlism"
}

export async function generateMetadata({params}: {params: {format: string}}, parent : ResolvingMetadata) : Promise<ResolvingMetadata>{
    const {format} = params;
    if(format === "" || format === undefined){
        return {
            ...parent,
            ...defaultMetadata
        }
    }
    const url = new URL("https://convertfast.media");
    const keywords = defaultMetadata.keywords as string[];

    return {
        ...parent,
        title : {
            template: `Convert ${primaryFormat.toUpperCase()} to ${format.toUpperCase()} Online`,
            absolute: `Convert ${primaryFormat.toUpperCase()} to ${format.toUpperCase()} Online`
        },
        metadataBase: url,
        description: `Convert ${primaryFormat.toUpperCase()} videos to ${format.toUpperCase()} online. No need to download any software. Fast and easy to use. Full privacy.`,
        applicationName: "Convertfast",
        creator: "Techlism",
        authors: "Techlism",
        keywords: keywords
    }
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
                <ConverterHeroSection format={format} primaryFormat={primaryFormat}/>            
                <VideoProperties format = {format} primaryFormat={primaryFormat}/>
            </div>

        </NOSSRWrapper>            
        </main>
    )
}