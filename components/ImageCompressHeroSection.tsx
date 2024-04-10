import { Lock } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function ImageCompressionHeroSection() {
    return (
        <div className="space-y-5 flex flex-col justify-center align-middle items-center">
            <h1 className="text-5xl font-bold text-center">
                Compress your Images Quickly
            </h1>
            <div className="m-2 text-md text-gray-500 dark:text-gray-400 max-w-fit border p-4 rounded-lg font-medium flex flex-wrap justify-evenly flex-col space-y-2 shadow-sm">
                <Lock/>
                <p className="mr-2">         
                    Your images will not be uploaded to any server. <br/>All the processing is done on your device and due to this, the processing time may vary depending on your device.
                </p>
                <p className="mr-2">Also if your image is exorbitantly high in resolution it may not work.</p>
                <Separator/>
                {/* <p className="mr-2">Please adjust the resolution or quality accordingly.</p> */}

                <Link href="#" className="text-gray-600 dark:text-gray-200 hover:underline">Learn More</Link>
            </div>
        </div>        
    );
}