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
	title: "Convifi: Fast, Secure and Browser-based File Converter",
	description:
		"Convifi: Free, secure media file converter & compressor — fast, browser-based, and private.",
	keywords: [
		"file converter",
		"file compressor",
		"compress files online",
		"file compress online",
		"convert files online",
		"file convert online",
		"convifi",
		"convifi online",
		"convifi file converter",
		"convifi file compressor",
		"convifi file convert",
		"convifi file compress",
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
	],
	openGraph: {
		images: "https://convifi.com/opengraph.png",
		siteName: "Convifi",
	},
	twitter: {
		images: "https://convifi.com/opengraph.png",
		site: "Convifi",
	},
	manifest: "/manifest.json",
	metadataBase: new URL("https://convifi.com"),
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
	name: "Convifi",
	url: "https://convifi.com",
	description: metadata.description,
	potentialAction: {
		"@type": "Action",
		name: "Convert File Format",
		target: {
			"@type": "EntryPoint",
			urlTemplate:
				"https://convifi.com/convert/{sourceFormat}-to-{targetFormat}",
		},
		"query-input": "required name=sourceFormat required name=targetFormat",
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
						<FumaDocsRootProvider theme={{ enabled: true, enableSystem: true }}>
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
