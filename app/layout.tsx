import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Footer from "@/components/Footer";
import type { Viewport } from "next";
// import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { RootProvider as FumaDocsRootProvider } from "fumadocs-ui/provider";

export const metadata: Metadata = {
	title: "Convertfast: Fast, Secure and Browser-based File Converter",
	description:
		"Convertfast: Free, secure media file converter & compressor — fast, browser-based, and private.",
	keywords: [
		"file converter",
		"file compressor",
		"compress files online",
		"file compress online",
		"convert files online",
		"file convert online",
		"convertfast",
		"convertfast online",
		"convertfast file converter",
		"convertfast file compressor",
		"convertfast file convert",
		"convertfast file compress",
		"compress images for forms",
		"compress photos",
		"jpeg to png",
		"jpg to png",
		"png to jpg",
		"png to svg",
		"mov to mp4",
		"convert fast",
		"how to compress files locally",
		"compress files without uploading",
		"how to convert files locally",
		"convertfast media",
	],
	openGraph: {
		images: "https://convertfast.media/opengraph.png",
		siteName: "Convertfast",
	},
	twitter: {
		images: "https://convertfast.media/opengraph.png",
		site: "@convertfast",
	},
	manifest: "/manifest.json",
	alternates: {
		canonical: "https://convertfast.media",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Convertfast",
	url: "https://convertfast.media",
	description: metadata.description,
	potentialAction: {
		"@type": "Convert",
		target: {
			"@type": "EntryPoint",
			urlTemplate: "https://convertfast.media/convert/{A-to-B}",
		},
		"query-input": "required name=A-to-B",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<script
				type="application/lg+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd),
				}}
			/>
			<body className={`${GeistSans.className}`}>
				<PostHogProvider>
					<ThemeProvider attribute="class" enableSystem>
						<FumaDocsRootProvider theme={{enabled : true, enableSystem : true}}>
							<Navbar />
							{children}
							<Footer />
						</FumaDocsRootProvider>
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	);
}
