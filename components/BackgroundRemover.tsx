"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Download, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { removeBackground } from "@imgly/background-removal";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";

type DownloadFileType = "image/png" | "image/webp";

export default function BackgroundRemover(): JSX.Element {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [imageDownloadType, setImageDownloadType] =
        useState<DownloadFileType>("image/png");
    const [useLargerModel, setUseLargerModel] = useState<boolean>(false);

    function fileName() {
        let nameWithoutExtention = inputFile?.name;
        if (
            nameWithoutExtention &&
            nameWithoutExtention?.split(".").length > 1
        ) {
            nameWithoutExtention = nameWithoutExtention.split(".")[0];
        }

        if (imageDownloadType === "image/png") {
            return `bg_removed_${nameWithoutExtention}.png`;
        } else return `bg_removed_${nameWithoutExtention}.webp`;
    }

    async function removeBackgroundLocal(): Promise<void> {
        setProcessing(true);
        setErrorMsg("");
        setOutputFileURL("");
        setProgress(0);
        try {
            if (inputFile) {
                const imageData = await new Response(inputFile).blob();
                //
                const blob = await removeBackground(imageData, {
                    progress: (key: string, current: number, total: number) => {
                        if (key.includes("compute")) {
                            setProgress(Math.round((current / total) * 100));
                        }
                    },
                    model: useLargerModel ? "isnet_fp16" : "isnet_quint8",
                    output: {
                        format: imageDownloadType,
                        quality: 1,
                    },
                });
                console.log("Output Blob:", blob);
                const url = URL.createObjectURL(blob);
                console.log("Output URL:", url);
                setOutputFileURL(url);
            }
        } catch (error) {
            setErrorMsg(
                "Error removing background. See console for more details."
            );
            console.error("Error removing background:", error);
        }

        setProcessing(false);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            if (file.type.startsWith("image/")) {
                setInputFile(file);
                setErrorMsg("");
            } else {
                setErrorMsg("Please select a valid image file.");
            }
        }
    };

    const resetUpload = () => {
        setInputFile(null);
        setOutputFileURL("");
        setErrorMsg("");
        setProgress(0);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
                setInputFile(file);
                setErrorMsg("");
            } else {
                setErrorMsg("Please select a valid image file.");
            }
        }
    };

    const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="flex align-middle justify-center flex-col border p-2 rounded-lg shadow-md">
            <div className="m-2">
                {inputFile == null ? (
                    <Label
                        htmlFor="dropzone-file"
                        className="justify-self-center cursor-pointer"
                    >
                        <div
                            className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg"
                            onDragOver={preventDefaults}
                            onDragEnter={preventDefaults}
                            onDragLeave={preventDefaults}
                            onDrop={handleDrop}
                        >
                            <UploadIcon />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                                <span className="font-semibold">
                                    Click to Select
                                </span>{" "}
                                or Drag and Drop
                            </p>
                        </div>
                        <Input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </Label>
                ) : (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 border-teal-500">
                        <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 text-center">
                            {inputFile.name.length <= 23
                                ? inputFile.name
                                : `${inputFile.name.substring(
                                      0,
                                      15
                                  )}....${inputFile.name.substring(
                                      inputFile.name.length - 5
                                  )}`}
                        </p>
                        <Button
                            variant="ghost"
                            onClick={resetUpload}
                            className="text-xs opacity-30 justify-self-end"
                            disabled={processing}
                        >
                            Choose a different image
                        </Button>
                    </div>
                )}
            </div>
            <div className="space-y-4 m-2">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <h3 className="font-medium">
                            Use larger model
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Improves quality but uses ~2x more data
                        </p>
                    </div>
                    <Switch
                        checked={useLargerModel}
                        onCheckedChange={()=>setUseLargerModel((prev) => !prev)}
                    />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <h3 className="font-medium">
                            Output as WebP
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Smaller file size, wide compatibility
                        </p>
                    </div>
                    <Switch
                        checked={imageDownloadType === "image/webp"}
                        onCheckedChange={() => {
                            setImageDownloadType(
                                imageDownloadType === "image/webp"
                                    ? "image/png"
                                    : "image/webp"
                            );
                        }}
                    />
                </div>
            </div>
            {errorMsg && (
                <div className="border p-4 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500 m-2 font-medium transition-transform">
                    {errorMsg}
                </div>
            )}
            {processing && (
              <div className="border p-4 m-2 rounded-lg">
                <Progress value={progress} className="text-grey-500" defaultValue={0} />
              </div>
              
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 items-center border m-2 p-5 rounded-lg">
                <Button
                    onClick={removeBackgroundLocal}
                    disabled={!inputFile || processing}
                >
                    {processing ? "Processing..." : "Remove Background"}
                </Button>
                {outputFileURL !== "" && (
                    <a
                        href={outputFileURL}
                        download={fileName()}
                        className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
                    >
                        Download <Download size={15} className="ml-2" />
                    </a>
                )}
                {outputFileURL !== "" && (
                    <Button
                        onClick={resetUpload}
                        className="text-md"
                        variant="outline"
                    >
                        Remove Another
                    </Button>
                )}
            </div>
        </div>
    );
}
