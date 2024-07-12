import ConverterHeroSection from "@/components/ConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata, ResolvingMetadata } from "next";

const supportedFormats = ['mkv', 'mp4', 'flv', 'webm', 'mov'];
const primaryFormat = 'avi';


const defaultMetadata : Metadata = {
    title: "Convert AVI to MP4, MOV & More Formats Online",   
    description: "Convert AVI to MP4, MOV, FLV, WebM, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert avi to mp4", "convert avi to mov", "convert avi to flv", "convert avi to webm", "convert avi to mkv", "avi to mp4", "avi to mov", "avi to flv", "avi to webm", "avi to mkv", "avi to mp4 online", "avi to mov online", "avi to flv online", "avi to webm online", "avi to mkv online", "avi to mp4 converter", "avi to mov converter", "avi to flv converter", "avi to webm converter", "avi to mkv converter"],
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
    const keywordsSet = new Set([`convert ${primaryFormat} to ${format.toLowerCase()}`, `${primaryFormat} to ${format.toLowerCase()}`, `${primaryFormat} to ${format.toLowerCase()} online`, `${primaryFormat} to ${format.toLowerCase()} converter`, `upload ${primaryFormat.toUpperCase()} to Instagram`, `upload ${primaryFormat.toUpperCase()} to tiktok`, `convert avi videos to ${format.toLowerCase()}`,...defaultMetadata.keywords as string[]]);
    const keywords = Array.from(keywordsSet).join(", ");

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
        keywords: keywords,
        alternates : {
            canonical : `https://convertfast.media/${primaryFormat}-to-${format}`
        }        
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