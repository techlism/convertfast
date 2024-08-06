'use client';
import { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button"; // Assuming you have a Button component
import { Separator } from '@/components/ui/separator';

const videoFormats = ["MP4", "MKV", "AVI", "MOV", "FLV", "WEBM"];
const audioFormats = ["MP3", "WAV", "AAC", "M4A"];
const imageFormats = ["JPEG", "PNG", "JPG", "SVG", "BMP", "WEBP"];

export default function ConversionSelector() {
    const [selectedFromFormat, setSelectedFromFormat] = useState<string>("");
    const [selectedToFormat, setSelectedToFormat] = useState<string>("");

    const handleFromFormat = (value: string) => {
        setSelectedToFormat("");
        setSelectedFromFormat(value);
    }

    const handleToFormat = (value: string) => {
        setSelectedToFormat(value);
    }

    const getConversionUrl = () => {
        if (selectedFromFormat && selectedToFormat) {
            return `/${selectedFromFormat.toLowerCase()}-to-${selectedToFormat.toLowerCase()}`;
        }
        return '#';
    }

    return(
        <div className="my-20">
            <h2 className="text-3xl font-bold mb-3">Try it now</h2>
            <div className="border p-4 rounded-lg flex flex-col items-center align-middle justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 items-center gap-5 mb-5 border p-4 rounded-lg">
                    <Select onValueChange={handleFromFormat}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="From"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <ScrollArea className="h-72">
                                    {videoFormats.map((format) => (
                                        <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}
                                    <Separator/>
                                    {imageFormats.map((format) => (
                                        format !== "SVG" &&
                                        <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}
                                    <Separator/>
                                    {audioFormats.map((format) => (
                                        <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}                               
                                </ScrollArea>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleToFormat}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="To"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <ScrollArea className="h-50">
                                    {videoFormats.includes(selectedFromFormat) && videoFormats.map((format) => (
                                        format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}
                                    {imageFormats.includes(selectedFromFormat) && imageFormats.map((format) => (
                                        format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}
                                    {audioFormats.includes(selectedFromFormat) && audioFormats.map((format) => (
                                        format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
                                    ))}                             
                                </ScrollArea>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
					<Link href={getConversionUrl()} passHref className="w-full">
						<Button 
							disabled={!selectedFromFormat || !selectedToFormat}
							className="w-full"
						>
							Convert Now
						</Button>
					</Link>					                      
                </div>
				<Separator className="mb-4"/>				
				<div className="grid grid-cols-1 gap-4">


					<Link href="/compress-images" passHref className="w-full">
						<Button variant="outline" className="w-full">
							Compress Images
						</Button>
					</Link>
					<Link href="/remove-bg" passHref className="w-full">
						<Button variant="outline" className="w-full">
							Remove Background
						</Button>
					</Link>
				</div>
            </div>
        </div>
    )
}