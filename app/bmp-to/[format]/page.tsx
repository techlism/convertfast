import React, { useState } from 'react';
import ImageConverter from '@/components/ImageConverter';
import NOSSRWrapper from '@/components/NOSSRWrapper';
import ImageHeroSection from '@/components/ImageConversionHeroSection';
import UnsupportedFormat from '@/components/UnsuportedFormat';
import type { Metadata, ResolvingMetadata } from 'next';

const supportedFormats = ['jpeg', 'jpg', 'svg', 'pdf', 'png', 'webp'];
const primaryFormat = 'bmp' ;

const defaultMetadata : Metadata = {
    title: "Convert BMP to JPG, PNG, SVG, PDF & More Formats Online",   
    description: "Convert BMP to JPG, PNG, SVG, PDF, WEBP and other image formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert bmp to jpg", "convert bmp to png", "convert bmp to svg", "convert bmp to pdf", "convert bmp to webp", "bmp to jpg", "bmp to png", "bmp to svg", "bmp to pdf", "bmp to webp", "bmp to jpg online", "bmp to png online", "bmp to svg online", "bmp to pdf online", "bmp to webp online", "bmp to jpg converter", "bmp to png converter", "bmp to svg converter", "bmp to pdf converter", "bmp to webp converter", "how to convert bmp to png", "how to convert bmp to jpg", "how to convert bmp to svg", "how to convert bmp to pdf", "how to convert bmp to webp", "upload bmp to Instagram", "upload bmp to tiktok", "convert bmp images to jpg", "convert bmp images to png", "convert bmp images to svg", "convert bmp images to pdf", "convert bmp images to webp", "convert bmp images to jpg online", "convert bmp images to png online", "convert bmp images to svg online", "convert bmp images to pdf online", "convert bmp images to webp online", "convert bmp images to jpg converter", "convert bmp images to png converter", "convert bmp images to svg converter", "convert bmp images to pdf converter", "convert bmp images to webp converter"],
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
        <main className="flex justify-center align-middle items-center min-h-screen m-4">
            <NOSSRWrapper >
                <div>
                    <ImageHeroSection format={format} primaryFormat={primaryFormat}/>
                    <ImageConverter format={format} primaryFormat={primaryFormat}/>
                </div>
               </NOSSRWrapper>
        </main>
    )
}
