import ImageCompressionHeroSection from "@/components/ImageCompressHeroSection";
import ImageCompressor from "@/components/ImageCompressor";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "Compress Images Locally",
    description: "Compress images and photos quickly and easily without uploading them to any server.",
    keywords : ["compress images", "compress photos", "compress pictures", "compress image online", "compress image", "compress without uploading", "resize", "resize to 50kb", "resize photographs for forms","decrease image size"],
    creator : "Techlism",
    alternates : {
        canonical : "https://convertfast.media/compress-images"
    }
}

export default function Home(){
    return(
        <main className="flex justify-center align-middle items-center min-h-screen m-4">
            <NOSSRWrapper>                
                <div>                    
                    <ImageCompressionHeroSection/>
                    <ImageCompressor/>
                </div>                
            </NOSSRWrapper>

        </main>
    )
}