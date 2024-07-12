import ConverterHeroSection from "@/components/ConverterHeroSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoConverterwithProperties";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import type { Metadata, ResolvingMetadata } from "next";


const supportedFormats = ['mkv', 'avi', 'flv', 'webm', 'mp4'];
const primaryFormat = 'mov' ;

const defaultMetadata : Metadata = {
    title: `Convert ${primaryFormat.toUpperCase()} to MP4, AVI, FLV, WebM & More Formats Online`,   
    description: `Convert ${primaryFormat.toUpperCase()} to MP4, AVI, FLV, WebM, MKV and other video formats online. No need to download any software. Fast and easy to use. Full privacy.`,
    keywords : ["convert mov to mp4", "convert mov to avi", "convert mov to flv", "convert mov to webm", "convert mov to mkv", "mov to mp4", "mov to avi", "mov to flv", "mov to webm", "mov to mkv", "mov to mp4 online", "mov to avi online", "mov to flv online", "mov to webm online", "mov to mkv online", "mov to mp4 converter", "mov to avi converter", "mov to flv converter", "mov to webm converter", "mov to mkv converter", "upload ${primaryFormat.toUpperCase()} to Instagram", "upload ${primaryFormat.toUpperCase()} to tiktok", "convert apple videos to mp4"],
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
    const keywordsSet = new Set([`convert ${primaryFormat} to ${format.toLowerCase()}`, `${primaryFormat} to ${format.toLowerCase()}`, `${primaryFormat} to ${format.toLowerCase()} online`, `${primaryFormat} to ${format.toLowerCase()} converter`, `upload ${primaryFormat.toUpperCase()} to Instagram`, `upload ${primaryFormat.toUpperCase()} to tiktok`, `convert apple videos to ${format.toLowerCase()}`,...defaultMetadata.keywords as string[]]);
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