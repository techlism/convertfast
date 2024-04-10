
import React, { useState } from 'react';
import ImageConverter from '@/components/ImageConverter';
import NOSSRWrapper from '@/components/NOSSRWrapper';
import ImageHeroSection from '@/components/ImageHeroSection';
import UnsupportedFormat from '@/components/UnsuportedFormat';

const supportedFormats = ['jpeg', 'jpg', 'svg', 'pdf', 'png', 'webp'];
const primaryFormat = 'bmp'

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
