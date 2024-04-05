'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const conversionImages = ["/video-conversion-formats.svg", "/image-conversion-formats.svg"];

export default function HomeHeroCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currIndex) => (currIndex + 1) % conversionImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="justify-self-center">
            <Image
                src={conversionImages[currentImageIndex]}
                alt="List Conversion Formats"
                height={700}
                width={700}
                className="dark:inverted transition"
            />
        </div>
    );
}
