import React, { useState } from 'react';
import ImageConverter from '@/components/ImageConverter';
import NOSSRWrapper from '@/components/NOSSRWrapper';
import ImageHeroSection from '@/components/ImageConversionHeroSection';
import UnsupportedFormat from '@/components/UnsuportedFormat';
import type { Metadata, ResolvingMetadata } from 'next';

const supportedFormats = ['jpeg', 'jpg', 'svg', 'pdf', 'png', 'bmp'];
const primaryFormat = 'webp'

const defaultMetadata : Metadata = {
    title: "Convert WEBP to JPG, PNG, SVG, PDF & More Formats Online",   
    description: "Convert WEBP to JPG, PNG, SVG, PDF, BMP and other image formats online. No need to download any software. Fast and easy to use. Full privacy.",
    keywords : ["convert webp to jpg", "convert webp to png", "convert webp to svg", "convert webp to pdf", "convert webp to bmp", "webp to jpg", "webp to png", "webp to svg", "webp to pdf", "webp to bmp", "webp to jpg online", "webp to png online", "webp to svg online", "webp to pdf online", "webp to bmp online", "webp to jpg converter", "webp to png converter", "webp to svg converter", "webp to pdf converter", "webp to bmp converter"],
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
