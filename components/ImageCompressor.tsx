"use client";
import { useEffect, useState } from "react";
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
  MagickGeometry,
} from "@imagemagick/magick-wasm";
import { Slider } from "@/components/ui/slider";
import { Separator } from "./ui/separator";
export default function ImageCompressor() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [wasm, setWasm] = useState<ArrayBuffer | undefined>(undefined);
  const [resolutionPercentage, setResolutionPercentage] = useState(100);
  const [qualityPercentage, setQualityPercentage] = useState(100);
  const [compressedFileSizeString, setCompressedFileSizeString] = useState("");
  useEffect(() => {
    async function loadWASM() {
      try {
        const response = await fetch("/magick.wasm"); // may produce CORS issue but let's see in production
        const buffer = await response.arrayBuffer();
        setWasm(buffer);
      } catch (error) {
        setErrorMsg("Error loading WASM:");
        console.error("Error loading WASM:", error);
      }
    }
    loadWASM();
  }, [inputFile]);

  function getMIMEType(fileName: File["name"]) {
    const extension = fileName.toLowerCase().split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "webp":
        return "image/webp";
      case "tiff":
        return "image/tiff";
      case "bmp":
        return "image/bmp";
      default:
        return "image/x-unknown";
    }
  }

  async function compressImageAndSetURL() {
    setCompressedFileSizeString("");
    setConverting(true);
    setErrorMsg("");
    setOutputFileURL("");
    try {
      const buffer = wasm;
      if (inputFile && buffer) {
        await initializeImageMagick(buffer);
        const imageBuffer = await inputFile?.arrayBuffer();
        const imageData = new Uint8Array(imageBuffer!);
        ImageMagick.read(imageData, (image) => {
          image.quality = qualityPercentage;
          const originalWidth = image.width;
          const originalHeight = image.height;
          const desiredResolution =
            (resolutionPercentage / 100) * (originalWidth * originalHeight);
          const aspectRatio = originalWidth / originalHeight;
          const newHeight = Math.round(
            Math.sqrt(desiredResolution / aspectRatio)
          );
          const newWidth = Math.round(aspectRatio * newHeight);
          //   image.negateGrayScale(); -- not sure if this is needed
          const conversionParameters = new MagickGeometry(newWidth, newHeight);
          /* Leaving this part here for future reference -- As of quantizing ain't feasible */
          // const quantizingValues = new QuantizeSettings();
          // quantizingValues.colorSpace = ColorSpace.RGB;
          // quantizingValues.treeDepth = 8;
          // quantizingValues.ditherMethod = 2
          // image.quantize(quantizingValues);
          image.resize(conversionParameters);
          // image.format = format.toUpperCase() as MagickFormat;
          // console.log(image.format);
          image.write((data) => {
            // Removed the file Blob to URL part as it was creating issues with mobile phones
            const fileMIMEType = getMIMEType(inputFile.name);
            const fileBlob = new Blob([data], { type: fileMIMEType });
            const reader = new FileReader();

            reader.onload = () => {
              if (reader.result !== null && typeof reader.result === "string") {
                const base64String = reader?.result?.split(",")[1];
                const imageFormat = reader.result
                  .split(":")[1]
                  .split(";")[0]
                  .split("/")[1];
                setOutputFileURL(`data:${fileMIMEType};base64,${base64String}`);
              }
              setCompressedFileSizeString(            
                `Original Size : ${Math.round(((inputFile.size/1024)*100)/100)} KB\n
                  Size after Compression: ${
                  Math.round((fileBlob.size / 1024) * 100) / 100
                } KB`
              );

              setConverting(false);
            };

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
    if (file) {
      if (
        file.name.toLowerCase().endsWith("jpeg") ||
        file.name.toLowerCase().endsWith("jpg") ||
        file.name.toLowerCase().endsWith("png") ||
        file.name.toLowerCase().endsWith("webp") ||
        file.name.toLowerCase().endsWith("tiff") ||
        file.name.toLowerCase().endsWith("bmp")
      ) {
        setInputFile(file);
        setErrorMsg("");
      } else {
        setErrorMsg(
          `This is may not be a valid image file or the file format is not supported. Please select a valid image file.`
        );
      }
    }
  };

  const resetUpload = () => {
    // setCompressedFileSizeString("");
    // setQualityPercentage(100);
    // setResolutionPercentage(100);
    // setInputFile(null);
    // setOutputFileURL("");
    // setErrorMsg("");
    window.location.reload();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files?.[0] || null;
      // file?.name && console.log(file.name);
      if (file) {
        if (
          file.name.toLowerCase().endsWith("jpeg") ||
          file.name.toLowerCase().endsWith("jpg") ||
          file.name.toLowerCase().endsWith("png") ||
          file.name.toLowerCase().endsWith("webp") ||
          file.name.toLowerCase().endsWith("tiff") ||
          file.name.toLowerCase().endsWith("bmp")
        ) {
          setInputFile(file);
          setErrorMsg("");
        } else {
          setErrorMsg(
            `This is may not be a valid image file or the file format is not supported. Please select a valid image file.`
          );
        }
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
              accept={`image/*`}
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 border-teal-500">
            <p className=" text-lg font-semibold text-gray-500 dark:text-gray-400  text-center">
              {inputFile?.name.length <= 23
                ? inputFile?.name
                : `${inputFile?.name.substring(
                    0,
                    15
                  )}....${inputFile?.name.substring(
                    inputFile?.name.length - 5
                  )}`}
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
      {compressedFileSizeString && (
        <div className="border p-4 rounded-lg text-green-500 m-2 font-medium transition-transform text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg">
          {compressedFileSizeString.includes('\n') && compressedFileSizeString.split("\n").map((line, index) => (<p>{line}</p>))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4  items-center border m-2 p-5 rounded-lg">
        <div>
          <div className="flex justify-between align-middle items-center space-x-4 mb-4">
            <h3 className="text-xl font-semibold">
              Adjust Quality for Compression
            </h3>
            <p className="p-1 px-4 max-w-fit font-medium border text-xl rounded-lg bg-muted  w-16">
              {qualityPercentage}
            </p>
          </div>
          <Slider
            defaultValue={[100]}
            step={1}
            max={100}
            min={1}
            datatype="number"
            onValueChange={(value) => setQualityPercentage(value?.[0])}
          />
        </div>
        <Separator />
        <div>
          <div className="flex justify-between align-middle items-center space-x-4 mb-4">
            <h3 className="text-xl font-semibold">
              Adjust Resolution for Compression
            </h3>
            <p className="p-1 px-4 max-w-fit border rounded-lg font-medium bg-muted  w-16 text-xl">
              {resolutionPercentage}
            </p>
          </div>
          <Slider
            defaultValue={[100]}
            step={1}
            max={100}
            min={1}
            datatype="number"
            onValueChange={(value) => setResolutionPercentage(value?.[0])}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 items-center border m-2 p-5 rounded-lg">
        <Button
          onClick={compressImageAndSetURL}
          disabled={!inputFile || converting}
        >
          {compressedFileSizeString === "" ? "Compress" : "Re-Compress"}
        </Button>
        {outputFileURL !== "" && (
			<a
				href={outputFileURL}
				target="_blank"
				download={"compressed_" + inputFile?.name}
				className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
			>
				Download <Download size={15} className="ml-2" />
			</a>		
        )}
        {outputFileURL !== "" && (
          <Button
            onClick={resetUpload}
            className="text-md"
            variant={"outline"}
          >
            Compress Another
          </Button>
        )}
      </div>
    </div>
  );
}
