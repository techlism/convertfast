import React from 'react';
import ImageConverter from '@/components/ImageConverter';
import NOSSRWrapper from '@/components/NOSSRWrapper';
import ImageHeroSection from '@/components/ImageConversionHeroSection';
import UnsupportedFormat from '@/components/UnsuportedFormat';
import type { Metadata, ResolvingMetadata } from 'next';
const supportedFormats = ['jpeg', 'png' , 'webp', 'svg', 'pdf', 'bmp'];
const primaryFormat = 'jpg'

const defaultMetadata : Metadata = {
    title: "Convert JPEG to PNG, JPG, SVG, PDF & More Formats Online",   
    description: "Convert JPEG to PNG, JPG, SVG, PDF, BMP and other image formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert jpeg to png", "convert jpeg to jpg", "convert jpeg to svg", "convert jpeg to pdf", "convert jpeg to bmp", "jpeg to png", "jpeg to jpg", "jpeg to svg", "jpeg to pdf", "jpeg to bmp", "jpeg to png online", "jpeg to jpg online", "jpeg to svg online", "jpeg to pdf online", "jpeg to bmp online", "jpeg to png converter", "jpeg to jpg converter", "jpeg to svg converter", "jpeg to pdf converter", "jpeg to bmp converter"],
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
        keywords: keywords,
        alternates : {
            canonical : `https://convertfast.media/${primaryFormat}-to-${format}`
        }        
    }
}

export default function Home({ params }: { params: { format: string } }){
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
    return(
        <main className="flex justify-center align-middle items-center min-h-screen max-w-[90%] mx-auto">
            <NOSSRWrapper >
                <div>
                    <ImageHeroSection format={format} primaryFormat={primaryFormat}/>
                    <ImageConverter format={format} primaryFormat={primaryFormat}/>
                </div>
            </NOSSRWrapper>
        </main>
    )
}
