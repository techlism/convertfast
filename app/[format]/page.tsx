import { permanentRedirect } from "next/navigation";
import { conversions } from "@/lib/conversion-formats";
import UnsupportedFormat from "@/components/UnsuportedFormat";

export const dynamic = "force-static";

export async function generateMetadata({
	params,
}: {
	params: { format: string };
}) {
	const pattern = /^[a-z0-9]+-to-[a-z0-9]+$/i;
	if (!pattern.test(params.format)) return {};

	const [from, to] = params.format.toUpperCase().split("-TO-");
	const conversion = conversions.find(
		(c) => c.from.toUpperCase() === from && c.to.toUpperCase() === to,
	);

	if (!conversion) return {};

	return {
		...conversion.metadata,
		alternates: {
			canonical: `https://convertfast.media/convert/${params.format}`,
		},
	};
}

export async function generateStaticParams() {
	return conversions.map((conversion) => ({
		format: `${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
	}));
}

export default async function Page({ params }: { params: { format: string } }) {
	const pattern = /^[a-z0-9]+-to-[a-z0-9]+$/i;
	if (!pattern.test(params.format)) return <UnsupportedFormat/>

	const [from, to] = params.format.toLowerCase().split("-to-");
	const conversion = conversions.find(
		(c) => c.from.toLowerCase() === from && c.to.toLowerCase() === to,
	);

	if (conversion) {
		permanentRedirect(`/convert/${params.format}`);
	} else {
		return <UnsupportedFormat/>
	}
}
