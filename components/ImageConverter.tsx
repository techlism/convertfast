"use client";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Download, Info, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilmIcon, MusicIcon, ScissorsIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import {
  initializeImageMagick,
  ImageMagick,
  Magick,
  MagickFormat,
  Quantum,
} from "@imagemagick/magick-wasm";

export default function ImageConverter({
  format,
  primaryFormat,
}: {
  format: string;
  primaryFormat: string;
}) {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function loadWASM() {
	try {
	  const response = await fetch('/magick.wasm'); // may produce CORS issue but let's see in production
	  const buffer = await response.arrayBuffer();
	  return buffer;
	} catch (error) {
	  setErrorMsg("Error loading WASM:");
	  console.error("Error loading WASM:", error);	}
  }

  async function convertImageAndSetURL() {
    setConverting(true);
    setErrorMsg("");
    try {
        const buffer = await loadWASM() || null;
        if (inputFile && buffer) {      
          await initializeImageMagick(buffer);
          const imageBuffer = await inputFile?.arrayBuffer();
          const imageData = new Uint8Array(imageBuffer!);
          ImageMagick.read(imageData, (image) => {
            image.format = format.toUpperCase() as MagickFormat;
            // image.format = MagickFormat.Jpeg;
            // console.log(image.format);
            image.write((data) => {
              const url = URL.createObjectURL(
                new Blob([data], { type: `image/${format}` })
              );
              setOutputFileURL(url);
              setConverting(false);
            });
          });
        }   
    } catch (error) {
      setErrorMsg("Error converting image. See console for more details.");
      console.log("Error converting image:", error);
    }

    setConverting(false);
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    // file?.name && console.log(file.name);
    if (file && file.name.toLowerCase().endsWith(primaryFormat)) {
      setInputFile(file);
      setErrorMsg("");
    }
    if (file && !file.name.toLowerCase().endsWith(primaryFormat)) {
      setErrorMsg(
        `This is not a valid ${primaryFormat.toUpperCase()} file. Please select a valid ${primaryFormat.toUpperCase()} file.`
      );
    }
  };

  const resetUpload = () => {
    setInputFile(null);
    setOutputFileURL("");
    setErrorMsg("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files?.[0] || null;
      // file?.name && console.log(file.name);
      if (file && file.name.toLowerCase().endsWith(primaryFormat)) {
        setInputFile(file);
        setErrorMsg("");
      }
      if (file && !file.name.toLowerCase().endsWith(primaryFormat)) {
        const upperCase = primaryFormat.toUpperCase();
        setErrorMsg(
          `This is not a valid ${primaryFormat.toUpperCase()} file. Please select a valid ${primaryFormat.toUpperCase()} file.`
        );
      }
    }
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex align-middle justify-center flex-col">
      <div className="m-2">
        {inputFile == null ? (
          <Label
            htmlFor="dropzone-file"
            className="justify-self-center cursor-pointer"
          >
            <div
              className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg border-teal-600`}
              onDragOver={preventDefaults}
              onDragEnter={preventDefaults}
              onDragLeave={preventDefaults}
              onDrop={handleDrop}
            >
              <UploadIcon />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span className="font-semibold">Click to Select</span> or Drag
                and Drop
              </p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              accept={`.${primaryFormat}`}
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10">
            <p className=" text-lg font-medium text-gray-500 dark:text-gray-400">
              {inputFile?.name}
            </p>
            <Button
              variant={"ghost"}
              onClick={resetUpload}
              className="text-xs opacity-30 justify-self-end"
            >
              Choose a different image
            </Button>
          </div>
        )}
      </div>
      {errorMsg && (
        <div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform">
          {errorMsg}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 items-center border m-2 p-5 rounded-lg">
        <Button
          onClick={convertImageAndSetURL}
          disabled={!inputFile || converting || outputFileURL !== ""}
        >
          Convert
        </Button>
        {outputFileURL !== "" && (
          <Button className="bg-blue-600 dark:bg-blue-500 text-gray-200 hover:opacity-90">
            <a
              href={outputFileURL}
              download={`${inputFile?.name.slice(
                0,
                Number((format.length + 1) * -1)
              )}.${format}`}
              className="text-md font-semibold flex justify-center items-center align-middle"
            >
              Download <Download size={15} className="ml-2"/>
            </a>
          </Button>
        )}
        {outputFileURL !== "" && (
          <Button
            onClick={resetUpload}
            className="text-md ml-2"
            variant={"outline"}
          >
            Convert Another
          </Button>
        )}
      </div>
    </div>
  );
}
