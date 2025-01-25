import { Lock } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function DocumentConverterInfoSection({
	defaultSourceFormat,
	defaultTargetFormat,
}: { defaultSourceFormat?: string; defaultTargetFormat?: string }) {
	return (
		<div className="grid grid-cols-1 items-center align-middle gap-2 mb-2 max-w-7xl ">
			{defaultSourceFormat && defaultTargetFormat ? (
				<h1 className="text-5xl font-bold text-center">
					Convert your {defaultSourceFormat.toUpperCase()} files to{" "}
					{defaultTargetFormat.toUpperCase()} locally
				</h1>
			) : (
				<h1 className="text-5xl font-bold text-center">
					Convert Documents Online - Free, Secure and Local
				</h1>
			)}
			<div className="my-2 text-md text-gray-600 dark:text-gray-300 border p-4 rounded-lg font-medium flex flex-wrap justify-evenly flex-col space-y-2 shadow-md">
				<Lock />
				<p className="mr-2">
					Your files will not be uploaded to any server. <br /> All the
					processing is done on your device and due to this, the processing time
					may vary depending on your device.
					<br />
					Containerized file formats like Microsoft Word (.docx) and PowerPoint
					(.pptx) won&apos;t work properly if they contain embedded content like images, as WASM currently
					doesn&apos;t support full file input/output operations.{" "}
				</p>
				<Separator />
				<Link
					href="#"
					className="text-gray-600 dark:text-gray-200 hover:underline"
				>
					Learn More
				</Link>
			</div>
		</div>
	);
}
