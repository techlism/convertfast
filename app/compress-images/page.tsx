import ImageCompressionHeroSection from "@/components/ImageCompressHeroSection";
import ImageCompressor from "@/components/ImageCompressor";
import NOSSRWrapper from "@/components/NOSSRWrapper";

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