import { Info, Lock } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function HeroSection({format, primaryFormat}: {format: string, primaryFormat: string}) {
    return (
        <div className="grid grid-cols-1 items-center align-middle gap-2">
            <h1 className="text-5xl font-bold text-center">
                Convert your {primaryFormat.toUpperCase()} files to {format.toUpperCase()}
            </h1>
            <div className="m-2 text-md text-gray-500 dark:text-gray-400 border p-4 rounded-lg font-medium flex flex-wrap justify-evenly flex-col space-y-2 shadow-sm">
                <Lock/>
                <p className="mr-2">         
                    Your videos will not be uploaded to any server. <br/> All the processing is done on your device and due to this, the processing time may vary depending on your device.
                </p>
                <Separator/>
                <Link href="#" className="text-gray-600 dark:text-gray-200 hover:underline">Learn More</Link>
            </div>
        </div>        
    );
}