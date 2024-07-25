import BackgroundRemover from "@/components/BackgroundRemover";
import { Metadata } from "next/types";
export const metadata : Metadata = {
    title: "Remove Background from Images Locally",   
    description: "Remove background from images and photos quickly and easily without uploading them to any server.",
    keywords : ["remove background", "remove bg", "remove background from image", "remove background from photo", "remove background from picture", "remove background online", "remove background without uploading", "remove background from image online", "remove background from photo online", "remove background from picture online"],    
    creator : "Techlism",
    alternates : {
        canonical : "https://convertfast.media/compress-images"
    }
}
export default function Home() {
    return (
        <main className="flex justify-center align-middle items-center min-h-screen m-4">
                <div>
                    <BackgroundRemover/>
                </div>
        </main>
    )
}