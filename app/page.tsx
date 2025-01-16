import dynamic from "next/dynamic";

const HeroSectioWithoutSSR = dynamic(
	() => import("@/components/HomePageHeroSection"),
	{
		ssr: false,
	},
);

export default function Page() {
	return (
		<main className="flex justify-center align-middle items-center m-4 min-h-screen">
			<HeroSectioWithoutSSR />
		</main>
	);
}
