
import React, { useState } from 'react';
import ImageConverter from '@/components/ImageConverter';
import NOSSRWrapper from '@/components/NOSSRWrapper';
import ImageHeroSection from '@/components/ImageConversionHeroSection';
import UnsupportedFormat from '@/components/UnsuportedFormat';
import type { Metadata, ResolvingMetadata } from 'next';
const supportedFormats = ['jpeg', 'jpg' , 'webp', 'svg', 'pdf', 'bmp'];
const primaryFormat = 'png'

const defaultMetadata : Metadata = {
    title: "Convert PNG to JPG, JPEG, SVG, PDF & More Formats Online",   
    description: "Convert PNG to JPG, JPEG, SVG, PDF, BMP and other image formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert png to jpg", "convert png to jpeg", "convert png to svg", "convert png to pdf", "convert png to bmp", "png to jpg", "png to jpeg", "png to svg", "png to pdf", "png to bmp", "png to jpg online", "png to jpeg online", "png to svg online", "png to pdf online", "png to bmp online", "png to jpg converter", "png to jpeg converter", "png to svg converter", "png to pdf converter", "png to bmp converter", "convert photos to pdf"],
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
        <main className="flex justify-center align-middle items-center min-h-screen max-w-[90%] mx-auto my-10">
            <NOSSRWrapper >
                <div>
                    <ImageHeroSection format={format} primaryFormat={primaryFormat}/>
                    <ImageConverter format={format} primaryFormat={primaryFormat}/>
                </div>
               </NOSSRWrapper>
        </main>
    )
}
