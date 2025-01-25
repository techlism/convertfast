import { conversions } from "@/lib/conversion-formats";
import ImageConversionHeroSection from "@/components/ImageConversionHeroSection";
import VideoProperties from "@/components/VideoConverterwithProperties";
import AudioConverterWithProperties from "@/components/AudioConverterwithProperties";
import ConverterInfoSection from "@/components/ConverterInfoSection";
import UnsupportedFormat from "@/components/UnsuportedFormat";
import ImageConverter from "@/components/ImageConverter";
import type { Conversion } from "@/lib/conversion-formats";
import NOSSRWrapper from "@/components/NOSSRWrapper";
import DocumentConverterInfoSection from "@/components/DocumentConverterInfoSection";
import PandocConverter from "@/components/DocumentConverter";

export const dynamic = "force-static"; // Add this to force static generation

// Generate static paths for all valid conversions
export async function generateStaticParams() {
	return conversions.map((conversion) => ({
		format: `${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
	}));
}

export async function generateMetadata({
	params,
}: { params: { format: string } }) {
	const pattern = /^[a-z0-9]+-to-[a-z0-9]+$/i;
	if (!pattern.test(params.format)) return {};

	const [from, to] = params.format.toUpperCase().split("-TO-");
	const conversion = conversions.find(
		(c) => c.from.toUpperCase() === from && c.to.toUpperCase() === to,
	);
	return conversion
		? {
				...conversion.metadata,
				alternates: {
					canonical: `/convert/${params.format}`,
				},
			}
		: {};
}

function RenderConverter({
	to,
	from,
	type,
}: { to: string; from: string; type: Conversion["type"] }) {
	switch (type) {
		case "audio":
			return (
				<div>
					<ConverterInfoSection format={to} primaryFormat={from} />
					<AudioConverterWithProperties format={to} primaryFormat={from} />
				</div>
			);
		case "video":
			return (
				<div>
					<ConverterInfoSection format={to} primaryFormat={from} />
					<VideoProperties format={to} primaryFormat={from} />
				</div>
			);
		case "image":
			return (
				<div>
					<ImageConversionHeroSection format={to} primaryFormat={from} />
					<ImageConverter format={to} primaryFormat={from} />
				</div>
			);
		case "document":
			return (
				<div>
					<DocumentConverterInfoSection
						defaultSourceFormat={from}
						defaultTargetFormat={to}
					/>
					<PandocConverter
						defaultSourceFormat={from}
						defaultTargetFormat={to}
					/>
				</div>
			);
		default:
			return <UnsupportedFormat />;
	}
}

export default function Page({ params }: { params: { format: string } }) {
	const pattern = /^[a-z0-9]+-to-[a-z0-9]+$/i;
	if (!pattern.test(params.format)) return <UnsupportedFormat />;

	const [from, to] = params.format.toLowerCase().split("-to-");
	const conversion = conversions.find(
		(c) => c.from.toLowerCase() === from && c.to.toLowerCase() === to,
	);
	if (!conversion) {
		return <UnsupportedFormat />;
	}
	return (
		<main className="flex justify-center align-middle items-center min-h-screen max-w-7xl p-4 mx-auto">
			<NOSSRWrapper>
				<RenderConverter
					to={conversion.to.toLowerCase()}
					from={conversion.from.toLowerCase()}
					type={conversion.type}
				/>
			</NOSSRWrapper>
		</main>
	);
}
