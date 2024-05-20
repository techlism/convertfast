import HeroSection from "@/components/VideoConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata, ResolvingMetadata } from "next";
import AudioConverterWithProperties from "@/components/AudioConverterwithProperties";

const supportedFormats = ['mp3', 'aac', 'm4a'];
const primaryFormat = 'wav';

const defaultMetadata: Metadata = {
    title: "Convertfast - WAV to MP3, WAV to AAC, WAV to M4A",
    description: "Convertfast is a free online tool to convert and compress media files. No files are sent to any server - all conversions and compressions happen right on your machine.",
    keywords : ["file converter", "audio converter", "wav to mp3", "wav to aac", "wav to m4a", "convertfast", "convertfast online", "convertfast file converter", "convertfast file compressor", "convertfast file convert", "convertfast file compress", "compress images for forms", "compress photos", "jpeg to png", "jpg to png", "png to jpg", "png to svg", "mov to mp4", "convert fast", "how to compress files locally", "compress files without uploading", "how to convert files locally"],
};    

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
        <main className="flex justify-center align-middle items-center min-h-screen m-4" >
            <NOSSRWrapper>
                <div>
                    <HeroSection format={format} primaryFormat={primaryFormat}/>            
                    <AudioConverterWithProperties format = {format} primaryFormat={primaryFormat}/>
                </div>
            </NOSSRWrapper>            
        </main>
    )
}