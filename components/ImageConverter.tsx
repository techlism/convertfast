"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Download, Info, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import {
  initializeImageMagick,
  ImageMagick,
  Magick,
  MagickFormat,
  Quantum,
} from "@imagemagick/magick-wasm";
// import Link from "next/link";

export default function ImageConverter({format, primaryFormat}: {format: string; primaryFormat: string;}) {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  

  function getDownloadFileName(fileName: File["name"]) {
    const extension = fileName.toLowerCase().split(".").pop();
    const name = fileName.toLowerCase().split(".").shift();
    if(extension && name){
      return `${name}.${format}`;
    }
    else return `converted.${format}`
  }

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
              const fileBlob = new Blob([data], { type: `image/${format}` });
              const reader = new FileReader();
  
              reader.onload = () => {
                if (reader.result !== null && typeof reader.result === "string") {
                  const base64String = reader?.result?.split(",")[1];
                  setOutputFileURL(`data:${format};base64,${base64String}`);
                }
                setConverting(false);
              };
              reader.onerror = (error) => {
                setErrorMsg("Error converting image. See console for more details.");
                console.log("Error converting image:", error);
              }
  
              reader.readAsDataURL(fileBlob);
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
    if(primaryFormat === 'jpeg' || primaryFormat === 'jpg'){
      if((file && file.name.toLowerCase().endsWith('jpeg')) || (file && file.name.toLowerCase().endsWith('jpg'))){
        setInputFile(file);
        setErrorMsg("");
        return;
      }
    }
    if (file && file.name.toLowerCase().endsWith(primaryFormat)) {
      setInputFile(file);
      setErrorMsg("");
      return;
    }
    if (file && !file.name.toLowerCase().endsWith(primaryFormat)) {
      setErrorMsg(
        `This is not a valid ${primaryFormat.toUpperCase()} file. Please select a valid ${primaryFormat.toUpperCase()} file.`
      );
      return;
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
    <div className="flex align-middle justify-center flex-col border rounded-lg shadow-md">
      <div className="m-2">
        {inputFile == null ? (
          <Label
            htmlFor="dropzone-file"
            className="justify-self-center cursor-pointer"
          >
            <div
              className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg`}
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
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 border-teal-500">
            <p className=" text-lg font-semibold text-gray-500 dark:text-gray-400  text-center">
            {inputFile?.name.length <= 23 ? inputFile?.name : `${inputFile?.name.substring(0, 15)}....${inputFile?.name.substring(inputFile?.name.length - 5)}`}
            </p>
            <Button
              variant={"ghost"}
              onClick={resetUpload}
              className="text-xs opacity-30 justify-self-end"
              disabled={converting}
            >
              Choose a different image
            </Button>
          </div>
        )}
      </div>
      {errorMsg && (
        <div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform ease-in-out">
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
        {outputFileURL !== "" && inputFile?.name && (
            <a
              href={outputFileURL}
              download={getDownloadFileName(inputFile.name)}
              target="_blank"
              className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
            >
              Download <Download size={15} className="ml-2"/>
            </a>
        )}
        {outputFileURL !== "" && (
          <Button
            onClick={resetUpload}
            className="text-md"
            variant={"outline"}
          >
            Convert Another
          </Button>
        )}
      </div>
    </div>
  );
}
