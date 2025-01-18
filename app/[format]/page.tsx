import { redirect, notFound } from "next/navigation";
import { conversions } from "@/lib/conversion-formats";

export const dynamic = 'force-static';  // Add this to force static generation

export async function generateStaticParams() {
	return conversions.map((conversion) => ({
		format: `${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`,
	}));
}

export default function Page({ params }: { params: { format: string } }) {
	const pattern = /^[a-z0-9]+-to-[a-z0-9]+$/i;
	if (!pattern.test(params.format)) return notFound();

	const [from, to] = params.format.toLowerCase().split("-to-");
	const conversion = conversions.find(
		(c) => c.from.toLowerCase() === from && c.to.toLowerCase() === to,
	);

	if (conversion) {
		redirect(`/convert/${params.format}`);
	} else {
		return notFound();
	}
}
