import { Lock } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function BackgroundRemoverHeroSection() {
    return (
        <div className="grid grid-cols-1 items-center align-middle gap-2 mb-2">
            <h1 className="text-5xl font-bold text-center">
                Remove Background from Images Quickly
            </h1>
            <div className="my-2 text-md text-gray-600 dark:text-gray-400 border p-4 rounded-lg font-medium flex flex-wrap justify-evenly flex-col space-y-2 shadow-md">
                <Lock/>
                <p className="mr-2">         
                    Your images will not be uploaded to any server. <br/> All the processing is done on your device and due to this, the processing time may vary depending on your device.
                </p>
                <p className="mr-2 text-green-600 font-semibold">
                    Smaller model has a size of about 40MB, where as for the larger model, it is about 80MB.
                    <br />
                    Due to resource constraints, it may not work on Mobile phones.
                </p>
                <Separator/>
                <Link href="#" className="text-gray-600 dark:text-gray-200 hover:underline">Learn More</Link>
            </div>
        </div>        
    );
}
