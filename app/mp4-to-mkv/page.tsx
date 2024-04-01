'use client'
import NOSSRWrapper from "@/components/NOSSRWrapper";
import VideoProperties from "@/components/VideoProperties";


export default function Home(){    
    return (
        <main className="flex  justify-center align-middle min-h-screen m-4">
        <NOSSRWrapper>
            <VideoProperties/>
        </NOSSRWrapper>            
        </main>
    )
}