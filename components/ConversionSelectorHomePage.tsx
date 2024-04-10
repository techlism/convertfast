'use client';
const videoFormats = ["MP4", "MKV", "AVI", "MOV", "FLV", "WEBM"];
const audioFormats = ["MP3", "WAV", "AAC"];
const imageFormats = ["JPEG", "PNG", "JPG", "SVG", "BMP", "WEBP"];

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";


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
	useEffect(()=>{
		function redirect(){
			if(selectedFromFormat && selectedToFormat){
				window.location.href = `/${selectedFromFormat.toLowerCase()}-to-${selectedToFormat.toLowerCase()}`;
			}		
		}
		redirect();
	},[selectedFromFormat, selectedToFormat]);

    return(
		<div className="my-20">
			<h1 className="text-4xl font-bold mb-5">Select Conversion Type</h1>
			<div className="border p-4 rounded-lg flex items-center align-middle justify-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 items-center gap-5">
					<Select onValueChange={handleFromFormat}>
						<SelectTrigger className="w-[220px]">
							<SelectValue placeholder="From"/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<ScrollArea className="h-72">
									{
										videoFormats.map((format) => (
											<SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}
									<Separator/>
									{
										imageFormats.map((format) => (
											<SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}
									<Separator/>
									{
										audioFormats.map((format) => (
											<SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}									
								</ScrollArea>
							</SelectGroup>
						</SelectContent>
					</Select>
					{/* ------------------*/}
					<Select onValueChange={handleToFormat}>
						<SelectTrigger className="w-[220px]">
							<SelectValue placeholder="To"/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<ScrollArea className="h-50">
									{
										videoFormats.includes(selectedFromFormat) && videoFormats.map((format) => (
											format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}
									{
										imageFormats.includes(selectedFromFormat) && imageFormats.map((format) => (
											format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}
									{
										audioFormats.includes(selectedFromFormat) && audioFormats.map((format) => (
											format !== selectedFromFormat && <SelectItem key={format} value={format}>{format}</SelectItem>
										))
									}								
								</ScrollArea>
							</SelectGroup>
						</SelectContent>
					</Select>										
				</div>
			</div>
		</div>
	)
}