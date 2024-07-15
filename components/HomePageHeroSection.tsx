import HomeHeroCarousel from "./HomeHeroCarousel";

import { FileCheck2, Shield, WifiOff, MegaphoneOff } from "lucide-react";
import ConversionSelector from "./ConversionSelectorHomePage";
import LandingPageAnimation from './LandingPageAnimation';

export default function HomePageHeroSection() {
    return (
        <div className="my-10">
            <div className="grid grid-cols-1 gap-5 max-w-7xl items-center align-middle">  
                <LandingPageAnimation/>
                <h1 className="drop-shadow-sm text-pretty text-center text-3xl lg:text-6xl xl:text-6xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Convert, Compress and Chill.
                </h1>
                <p className="text-md lg:text-xl md:text-lg xl:text-xl text-pretty font-medium text-center">
                    No files are sent to any server - all the conversions and
                    compressions happen right on your machine.
                </p>
            </div>
            <div>
                <ConversionSelector />
            </div>
            {/* /--------------/ */}
            <div>
                <h1 className="text-4xl font-bold my-5">Why Convertfast?</h1>
                <div className="border p-4 rounded-lg flex space-x-4 mt-5">
                    <div className="flex items-center">
                        <FileCheck2 size={35} className="text-teal-500" />
                    </div>
                    <div className="w-[2px] bg-primary rounded-lg" />
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Support all the popular media formats
                        </h2>
                        <p className="font-medium text-gray-700 dark:text-gray-400">
                            Convertfast supports all popular media formats
                            including MP4, MP3, JPEG, PNG, MKV and many more.
                        </p>
                    </div>
                </div>
                {/* --------------- */}
                <div className="border p-4 rounded-lg flex space-x-4 mt-5">
                    <div className="flex items-center">
                        <Shield size={35} className="text-blue-500" />
                    </div>
                    <div className="w-[2px] bg-primary rounded-lg" />
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Complete Privacy
                        </h2>
                        <p className="font-medium text-gray-700 dark:text-gray-400">
                            Your files never leave your machine.
                        </p>
                    </div>
                </div>
                {/* --------------- */}
                <div className="border p-4 rounded-lg flex space-x-4 mt-5">
                    <div className="flex items-center">
                        <WifiOff size={35} className="text-red-500" />
                    </div>
                    <div className="w-[2px] bg-primary rounded-lg" />
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Works Offline
                        </h2>
                        <p className="font-medium text-gray-700 dark:text-gray-400">
                            All processing is performed locally, eliminating the
                            need for an internet connection once all components
                            are loaded, thus ensuring smooth operation.
                        </p>
                    </div>
                </div>
                {/* --------------- */}
                <div className="border p-4 rounded-lg flex space-x-4 mt-5">
                    <div className="flex items-center">
                        <MegaphoneOff size={35} className="text-yellow-500" />
                    </div>
                    <div className="w-[2px] bg-primary rounded-lg" />
                    <div>
                        <h2 className="text-2xl font-semibold">
                            No awkward Ads
                        </h2>
                        <p className="font-medium text-gray-700 dark:text-gray-400">
                            Currently,the website is free of advertisements.
                            Even if ads are introduced in the future, they will
                            be kept to a minimum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
