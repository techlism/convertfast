"use client";

import ConversionSelector from "./ConversionSelectorHomePage";
import LandingPageAnimation from "./LandingPageAnimation";
import Features from "./WhyConvertfast";

export default function HomePageHeroSection() {
	return (
		<div className="my-10">
			<div className="grid grid-cols-1 gap-5 max-w-7xl items-center align-middle">
				<LandingPageAnimation />
				<h1 className="drop-shadow-sm text-pretty text-center text-3xl lg:text-6xl xl:text-6xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
					Convert, Compress and Chill.
				</h1>
				<p className="text-md lg:text-xl md:text-lg xl:text-xl text-pretty font-medium text-center">
					We do not store or share your data—everything, including conversions and compressions, happens locally on your device.
				</p>
			</div>
			<div>
				<ConversionSelector />
			</div>
			<div>
				<Features />
			</div>
		</div>
	);
}
