"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Loader2,
	Copy,
	Download,
	UploadIcon,
	CopyCheck,
} from "lucide-react";
import {
	WASI,
	OpenFile,
	File,
	ConsoleStdout,
	PreopenDirectory,
} from "@bjorn3/browser_wasi_shim";
import { inputFormats, outputFormats } from "@/lib/document-formats";
import { Label } from "./ui/label";

type InputFormat = keyof typeof inputFormats;
type OutputFormat = keyof typeof outputFormats;

interface PandocExports extends WebAssembly.Exports {
	memory: WebAssembly.Memory;
	__wasm_call_ctors: () => void;
	malloc: (size: number) => number;
	hs_init_with_rtsopts: (argc_ptr: number, argv_ptr: number) => void;
	wasm_main: (args_ptr: number, args_length: number) => void;
}

interface PandocInstance extends WebAssembly.Instance {
	exports: PandocExports;
}

interface PandocConverterProps {
	defaultSourceFormat?: InputFormat;
	defaultTargetFormat?: OutputFormat;
}

const PandocConverter: React.FC<PandocConverterProps> = ({
	defaultSourceFormat,
	defaultTargetFormat,
}) => {
	const [sourceFormat, setSourceFormat] = useState<InputFormat | "">("");
	const [targetFormat, setTargetFormat] = useState<OutputFormat | "">("");
	const [copied, setCopied] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [fileName, setFileName] = useState("");
	const [fileContent, setFileContent] = useState<Uint8Array | null>(null);
	const [textContent, setTextContent] = useState("");
	const [outputContent, setOutputContent] = useState("");
	const [pandocInstance, setPandocInstance] = useState<
		((args_str: string, in_str: string) => string) | null
	>(null);
	const [error, setError] = useState<string|null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Validate and set default formats
	useEffect(() => {
		if (defaultSourceFormat && defaultTargetFormat) {
			const sourceExists = defaultSourceFormat in inputFormats;
			const targetExists = defaultTargetFormat in outputFormats;

			if (!sourceExists || !targetExists ) {
				setError("Invalid default format configuration provided. Please use the select menus below.");
				return;
			}
			setSourceFormat(defaultSourceFormat);
			setTargetFormat(defaultTargetFormat);
		}
	}, [defaultSourceFormat, defaultTargetFormat]);

	const getAcceptedFileTypes = useCallback(() => {
		if (sourceFormat) {
			const format = inputFormats[sourceFormat];
			return format.ext ? `${format.ext}` : undefined;
		}

		// If no source format is selected, return all possible input formats
		return Object.values(inputFormats)
			.map(format => format.ext ? `${format.ext}` : null)
			.filter(Boolean)
			.join(',');
	}, [sourceFormat]);

	const initializePandoc = useCallback(async () => {
		try {
			const args = ["pandoc.wasm", "+RTS", "-H64m", "-RTS"];
			const env: string[] = [];
			const in_file = new File(new Uint8Array(), { readonly: true });
			const out_file = new File(new Uint8Array(), { readonly: false });

			const fds = [
				new OpenFile(new File(new Uint8Array(), { readonly: true })),
				ConsoleStdout.lineBuffered((msg) =>
					console.log(`[WASI stdout] ${msg}`),
				),
				ConsoleStdout.lineBuffered((msg) =>
					console.warn(`[WASI stderr] ${msg}`),
				),
				new PreopenDirectory(
					"/",
					new Map([
						["in", in_file],
						["out", out_file],
					]),
				),
			];

			const wasi = new WASI(args, env, fds);
			const { instance } = await WebAssembly.instantiateStreaming(
				fetch("https://tweag.github.io/pandoc-wasm/pandoc.wasm"),
				{ wasi_snapshot_preview1: wasi.wasiImport },
			);

			const pandocInstance = instance as PandocInstance;
			wasi.initialize(pandocInstance);
			pandocInstance.exports.__wasm_call_ctors();

			function memory_data_view() {
				return new DataView(pandocInstance.exports.memory.buffer);
			}

			const argc_ptr = pandocInstance.exports.malloc(4);
			memory_data_view().setUint32(argc_ptr, args.length, true);
			const argv = pandocInstance.exports.malloc(4 * (args.length + 1));

			for (let i = 0; i < args.length; ++i) {
				const arg = pandocInstance.exports.malloc(args[i].length + 1);
				new TextEncoder().encodeInto(
					args[i],
					new Uint8Array(
						pandocInstance.exports.memory.buffer,
						arg,
						args[i].length,
					),
				);
				memory_data_view().setUint8(arg + args[i].length, 0);
				memory_data_view().setUint32(argv + 4 * i, arg, true);
			}

			memory_data_view().setUint32(argv + 4 * args.length, 0, true);
			const argv_ptr = pandocInstance.exports.malloc(4);
			memory_data_view().setUint32(argv_ptr, argv, true);
			pandocInstance.exports.hs_init_with_rtsopts(argc_ptr, argv_ptr);

			const pandocConverter = (args_str: string, in_str: string): string => {
				const args_ptr = pandocInstance.exports.malloc(args_str.length);
				new TextEncoder().encodeInto(
					args_str,
					new Uint8Array(
						pandocInstance.exports.memory.buffer,
						args_ptr,
						args_str.length,
					),
				);
				in_file.data = new TextEncoder().encode(in_str);
				pandocInstance.exports.wasm_main(args_ptr, args_str.length);
				return new TextDecoder("utf-8", { fatal: true }).decode(out_file.data);
			};

			setPandocInstance(() => pandocConverter);
			setIsLoading(false);
		} catch (err) {
			setError(`Failed to initialize Pandoc: ${(err as Error).message}`);
			setIsLoading(false);
		}
	}, []);

	React.useEffect(() => {
		initializePandoc();
	}, [initializePandoc]);

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const buffer = await file.arrayBuffer();
			setFileContent(new Uint8Array(buffer));
			setFileName(file.name);
			setTextContent(""); // Clear text input when file is selected

			// Try to detect source format from file extension
			const extension = file.name.split(".").pop()?.toLowerCase();
			const formatEntry = Object.entries(inputFormats).find(([_, format]) => {
				const outputFormat = outputFormats[_ as OutputFormat];
				return outputFormat?.ext?.endsWith(extension || "");
			});

			if (formatEntry) {
				setSourceFormat(formatEntry[0] as InputFormat);
			}
		} catch (err) {
			setError(`Failed to read file: ${(err as Error).message}`);
		}
	};

	function resetFileSelection() {
		setFileContent(null);
		setFileName("");
		setTextContent("");
		setOutputContent("");
		if (!defaultSourceFormat) {
			setSourceFormat('');
		}
	}

	const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const file = e.dataTransfer.files[0];
			try {
				const buffer = await file.arrayBuffer();
				setFileContent(new Uint8Array(buffer));
				setFileName(file.name);
				setTextContent(""); // Clear text input when file is selected

				// Try to detect source format from file extension
				const extension = file.name.split(".").pop()?.toLowerCase();
				const formatEntry = Object.entries(inputFormats).find(([_, format]) => {
					const outputFormat = outputFormats[_ as OutputFormat];
					return outputFormat?.ext?.endsWith(extension || "");
				});

				if (formatEntry) {
					setSourceFormat(formatEntry[0] as InputFormat);
				}
			} catch (err) {
				setError(`Failed to read file: ${(err as Error).message}`);
			}
		}
	};

	const handleConvert = useCallback(async () => {
		if (
			!pandocInstance ||
			(!fileContent && !textContent) ||
			!sourceFormat ||
			!targetFormat
		)
			return;

		try {
			const inputStr = fileContent
				? new TextDecoder().decode(fileContent)
				: textContent;

			const result = pandocInstance(
				`-f ${String(sourceFormat)} -t ${String(targetFormat)} -i /in -o /out --standalone`,
				inputStr,
			);

			setOutputContent(result);

			const outputFormatConfig = outputFormats[targetFormat];
			if (outputFormatConfig?.binary) {
				downloadOutput(result, outputFormatConfig);
			}
		} catch (err) {
			const errorMsg = (err as Error).message;
			if (errorMsg.includes("Could not fetch")) {
				setError(
					"Warning: External resources (like images) cannot be processed in the browser. The conversion will proceed without them.",
				);
			} else {
				setError(`Conversion failed: ${errorMsg}`);
			}
		}
	}, [pandocInstance, fileContent, textContent, sourceFormat, targetFormat]);

	const downloadOutput = (
		content: string,
		formatConfig: (typeof outputFormats)[OutputFormat],
	) => {
		const extension = formatConfig.ext || ".txt";
		const outputFileName = `${fileName.split(".")[0] || "output"}${extension}`;
		const blob = new Blob([content], {
			type: formatConfig.mime || "application/octet-stream",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = outputFileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleDownload = () => {
		if (!outputContent || !targetFormat) return;
		const formatConfig = outputFormats[targetFormat];
		downloadOutput(outputContent, formatConfig);
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(outputContent);
			setCopied(true);
			setTimeout(() => setCopied((prev) => !prev), 1500);
		} catch (err) {
			setError("Failed to copy to clipboard");
		}
	};
	const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const isSourceBinary = sourceFormat
		? inputFormats[sourceFormat]?.binary
		: false;
	const isTargetBinary = targetFormat
		? outputFormats[targetFormat]?.binary
		: false;

	return (
		<Card className="m-1">
			<CardContent className="space-y-4 p-2">
				{fileName === "" ? (
					<Label
						htmlFor="dropzone-file"
						className="justify-self-center cursor-pointer"
					>
						<div
							className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg gap-2 p-4"
							onDragOver={preventDefaults}
							onDragEnter={preventDefaults}
							onDragLeave={preventDefaults}
							onDrop={handleDrop}
						>
							<UploadIcon />
							<Button
								variant="outline"
								onClick={() => fileInputRef.current?.click()}
								disabled={isLoading}
							>
								Click to Select or Drag and Drop
							</Button>
						</div>
						{/* This is just a ref and should not be modified */}
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							onChange={handleFileSelect}
							accept={getAcceptedFileTypes()}
						/>
					</Label>
				) : (
					<div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 border-teal-500">
						<p className=" text-lg font-semibold text-gray-500 dark:text-gray-400  text-center">
							{fileName.length <= 23
								? fileName
								: `${fileName.substring(0, 15)}....${fileName.substring(fileName.length - 5)}`}
						</p>
						<Button
							variant={"ghost"}
							onClick={resetFileSelection}
							className="text-sm opacity-30 justify-self-end"
						>
							Choose a different document or discard selection
						</Button>
					</div>
				)}

				{error && (
					<div className="border p-2 rounded-lg bg-red-100 dark:bg-red-200 text-red-500 dark:text-red-500  font-medium transition-transform ease-in-out">
						{error}
					</div>
				)}

				<div className="flex items-center justify-between gap-4 mb-4">
					<div className="flex gap-4 flex-wrap w-full">
						<Select
							value={sourceFormat}
							onValueChange={(value: InputFormat) => setSourceFormat(value)}
							disabled={isLoading || (defaultSourceFormat !== undefined && defaultTargetFormat !== undefined && defaultSourceFormat in inputFormats && defaultTargetFormat in outputFormats)}
						>
							<SelectTrigger className="min-w-[200px] flex-wrap w-full">
								<SelectValue placeholder="Source format" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(inputFormats).map(([key, format]) => (
									<SelectItem key={key} value={key}>
										{format.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							value={targetFormat}
							onValueChange={(value: OutputFormat) => setTargetFormat(value)}
							disabled={isLoading || (defaultSourceFormat !== undefined && defaultTargetFormat !== undefined && defaultSourceFormat in inputFormats && defaultTargetFormat in outputFormats)}
						>
							<SelectTrigger className="min-w-[200px] flex-wrap w-full">
								<SelectValue placeholder="Target format" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(outputFormats).sort(([key1, _format1], [key2, _format2]) => key1.localeCompare(key2)).map(([key, format]) => (
									<SelectItem key={key} value={key}>
										{format.label.toUpperCase()}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{!isSourceBinary && (
					<Textarea
						placeholder="Enter text content..."
						value={textContent}
						onChange={(e) => setTextContent(e.target.value)}
						className="min-h-64"
					/>
				)}

				{!isTargetBinary && outputContent && (
					<div className="relative">
						<Textarea value={outputContent} readOnly className="min-h-64" />
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-2 right-2 animate-out"
							onClick={copyToClipboard}
						>
							{copied === false ? (
								<Copy className="h-4 w-4" />
							) : (
								<CopyCheck className="h-4 w-4" />
							)}
						</Button>
					</div>
				)}

				<div className="flex justify-center gap-4">
					<Button
						onClick={handleConvert}
						disabled={
							isLoading ||
							(!fileContent && !textContent) ||
							!sourceFormat ||
							!targetFormat
						}
						className="w-32"
					>
						{isLoading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							"Convert"
						)}
					</Button>

					{outputContent && (isTargetBinary || targetFormat) && (
						<Button
							onClick={handleDownload}
							className="bg-teal-600 dark:bg-teal-500 text-gray-100 hover:opacity-90 text-md font-medium flex justify-center items-center align-middle pt-2 pb-2 rounded-md"
						>
							<Download className="h-4 w-4 mr-2" />
							Download
						</Button>
					)}
					{outputContent && (isTargetBinary || targetFormat) && (
						<Button
							onClick={resetFileSelection}>
							Convert Another
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default PandocConverter;
