import type { Metadata } from "next";

export interface Conversion {
	from: string;
	to: string;
	metadata: Metadata;
	type: 'image' | 'video' | 'audio' | 'document';
}
function generateMeta(from: string, to: string, type: "image" | "video" | "audio" | "document"): Metadata {
	const formatCategories: Record<string, {
	  pros: string[],
	  use: string[],
	  compliance?: string[],
	  quality?: string[]
	}> = {
	  // Document Formats
	  MARKDOWN: {
		pros: ["easy to read", "lightweight", "widely supported", "version control friendly"],
		use: ["documentation", "readme files", "technical writing", "blog posts"],
		compliance: ["GitHub standard", "technical documentation requirements"]
	  },
	  HTML: {
		pros: ["web-friendly", "universal compatibility", "rich formatting", "interactive"],
		use: ["web content", "emails", "online documentation", "web archives"],
		compliance: ["W3C standards", "web accessibility guidelines"]
	  },
	  DOCX: {
		pros: ["Microsoft Office compatible", "rich formatting", "widely used", "track changes"],
		use: ["business documents", "resumes", "legal documents", "government website submissions"],
	  },
	  
	  // Video Formats
	  MP4: {
		pros: ["universal compatibility", "high compression", "streaming-friendly", "metadata support"],
		use: ["social media", "web streaming", "mobile playback", "professional video"],
		quality: ["4K support", "HDR compatible", "high bitrate"]
	  },
	  MKV: {
		pros: ["multiple audio tracks", "subtitle support", "chapter markers", "lossless quality"],
		use: ["movie archives", "TV shows", "multi-language content", "high-quality video storage"],
		quality: ["8K support", "lossless compression", "multiple codecs"]
	  },
	  AVI: {
		pros: ["wide compatibility", "uncompressed option", "legacy support"],
		use: ["older systems", "video archives", "CCTV recordings"],
		compliance: ["legacy system requirements", "older hardware compatibility"]
	  },
  
	  // Audio Formats
	  MP3: {
		pros: ["universal compatibility", "small size", "metadata support"],
		use: ["music streaming", "podcasts", "audio books", "background music"],
		quality: ["320kbps support", "ID3 tags", "variable bitrate"]
	  },
	  WAV: {
		pros: ["lossless quality", "professional standard", "uncompressed audio"],
		use: ["studio recording", "professional editing", "sound archives"],
		compliance: ["broadcast standards", "studio requirements"],
		quality: ["24-bit audio", "96kHz sampling", "professional audio"]
	  },
  
	  // Image Formats
	  PNG: {
		pros: ["lossless quality", "transparency support", "web-friendly"],
		use: ["web graphics", "logos", "screenshots", "digital art"],
		quality: ["lossless compression", "alpha channel", "high color depth"]
	  },
	  JPEG: {
		pros: ["small size", "universal compatibility", "good compression"],
		use: ["photography", "web images", "email attachments", "social media"],
		quality: ["progressive loading", "adjustable compression", "EXIF support"]
	  },
	  WEBP: {
		pros: ["modern compression", "animation support", "transparency"],
		use: ["web optimization", "responsive images", "fast loading sites"],
		quality: ["superior compression", "modern browsers", "alpha channel"]
	  }
	};
  
	const fromMeta = formatCategories[from.toUpperCase()];
	const toMeta = formatCategories[to.toUpperCase()];
  
	const descriptions: Record<string, string> = {
	  video: `Convert ${from} to ${to} in your browser - no upload needed! ${toMeta?.pros?.slice(0, 2).join(" and ")} output. 
	  Perfect for ${toMeta?.use?.slice(0, 2).join(" and ")}.`,
	  
	  image: `Transform ${from} images to ${to} format instantly in your browser. ${toMeta?.pros?.slice(0, 2).join(" and ")}. 
	  Ideal for ${toMeta?.use?.slice(0, 2).join(" and ")}. No file upload required - completely private and secure. 
	  ${toMeta?.quality?.slice(0, 2).join(" and ")} preservation.`,
	  
	  audio: `Convert ${from} audio to ${to} format with no quality loss. ${toMeta?.pros?.slice(0, 2).join(" and ")}. 
	  Perfect for ${toMeta?.use?.slice(0, 2).join(" and ")}. Process files locally - no upload needed. 
	  ${toMeta?.quality?.slice(0, 2).join(" and ")} support.`,
	  
	  document: `Convert ${from} to ${to} instantly in your browser. ${toMeta?.pros?.slice(0, 2).join(" and ")}. 
	  Ideal for ${toMeta?.use?.slice(0, 2).join(" and ")}. No file upload needed - 100% private and secure. 
	  ${toMeta?.compliance ? `Compliant with ${toMeta.compliance.slice(0, 2).join(" and ")}` : ''}`
	};
  
	// Base keywords for any format type
	const baseKeywords = [
	  `convert ${from.toLowerCase()} to ${to.toLowerCase()} online`,
	  `free ${from.toLowerCase()} to ${to.toLowerCase()} converter`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} no upload`,
	  `secure ${from.toLowerCase()} to ${to.toLowerCase()} conversion`,
	  `private ${from.toLowerCase()} converter ${to.toLowerCase()}`
	];
  
	// Generate compliance and regulation keywords
	const complianceKeywords = [
	  `government compliant ${from.toLowerCase()} to ${to.toLowerCase()}`,
	  `regulatory ${from.toLowerCase()} to ${to.toLowerCase()} conversion`,
	  `GDPR compliant ${type} converter`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} for official documents`,
	  `legal ${from.toLowerCase()} to ${to.toLowerCase()} conversion`,
	  ...(fromMeta?.compliance?.map(c => `${c} ${from.toLowerCase()} conversion`) || []),
	  ...(toMeta?.compliance?.map(c => `${c} ${to.toLowerCase()} output`) || [])
	];
  
	// Quality and technical keywords
	const qualityKeywords = [
	  ...(fromMeta?.quality?.map(q => `convert ${q} ${from.toLowerCase()}`) || []),
	  ...(toMeta?.quality?.map(q => `${to.toLowerCase()} with ${q}`) || []),
	  `high quality ${from.toLowerCase()} to ${to.toLowerCase()}`,
	  `lossless ${from.toLowerCase()} to ${to.toLowerCase()}`,
	  `professional ${type} conversion`
	];
  
	// Use case specific keywords
	const useCaseKeywords = [
	  ...(fromMeta?.use?.map(u => `${from.toLowerCase()} to ${to.toLowerCase()} for ${u}`) || []),
	  ...(toMeta?.use?.map(u => `convert ${from.toLowerCase()} for ${u}`) || []),
	  `bulk ${from.toLowerCase()} to ${to.toLowerCase()} conversion`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} for business`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} for enterprise`
	];
  
	// Media-specific keywords
	const mediaTypeKeywords = type === 'video' ? [
	  `compress ${from.toLowerCase()} to ${to.toLowerCase()}`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} with subtitles`,
	  `convert ${from.toLowerCase()} video quality`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} resolution change`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} with audio tracks`
	] : type === 'audio' ? [
	  `${from.toLowerCase()} to ${to.toLowerCase()} bitrate conversion`,
	  `convert ${from.toLowerCase()} audio quality`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} sample rate`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} audio channels`,
	  `convert ${from.toLowerCase()} metadata`
	] : type === 'image' ? [
	  `${from.toLowerCase()} to ${to.toLowerCase()} resize`,
	  `convert ${from.toLowerCase()} image quality`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} compression`,
	  `${from.toLowerCase()} to ${to.toLowerCase()} with transparency`,
	  `batch image ${from.toLowerCase()} to ${to.toLowerCase()}`
	] : [];
  
	const additionalFields = {
	  author: "Techlism",
	  robots: "index, follow",
	  language: "en",
	  openGraph: {
		title: `Convert ${from} to ${to} Securely - No Upload Required`,
		description: descriptions[type],
		type: "website"
	  },
	  twitter: {
		card: "summary_large_image",
		title: `Convert ${from} to ${to} in Your Browser`,
		description: `Free, secure, no-upload ${from} to ${to} converter`
	  }
	};
  
	return {
	  title: `Convert ${from} to ${to} Online | No Upload Needed | Free ${type.charAt(0).toUpperCase() + type.slice(1)} Converter`,
	  description: descriptions[type],
	  keywords: [...new Set([
		...baseKeywords,
		...complianceKeywords,
		...qualityKeywords,
		...useCaseKeywords,
		...mediaTypeKeywords
	  ])].join(", "),
	  creator: "Techlism",
	  ...additionalFields,
	};
  }

const conversions: Conversion[] = [
	{
		from: "MP4",
		to: "MKV",
		type: "video",
		metadata: generateMeta("MP4", "MKV", "video")
	},
	{
		from: "MP4",
		to: "AVI",
		type: "video",
		metadata: generateMeta("MP4", "AVI", "video")
	},
	{
		from: "MP4",
		to: "FLV",
		type: "video",
		metadata: generateMeta("MP4", "FLV", "video")
	},
	{
		from: "MP4",
		to: "WEBM",
		type: "video",
		metadata: generateMeta("MP4", "WEBM", "video")
	},
	{
		from: "MP4",
		to: "MOV",
		type: "video",
		metadata: generateMeta("MP4", "MOV", "video")
	},
	{
		from: "MKV",
		to: "MP4",
		type: "video",
		metadata: generateMeta("MKV", "MP4", "video")
	},
	{
		from: "MKV",
		to: "AVI",
		type: "video",
		metadata: generateMeta("MKV", "AVI", "video")
	},
	{
		from: "MKV",
		to: "FLV",
		type: "video",
		metadata: generateMeta("MKV", "FLV", "video")
	},
	{
		from: "MKV",
		to: "WEBM",
		type: "video",
		metadata: generateMeta("MKV", "WEBM", "video")
	},
	{
		from: "MKV",
		to: "MOV",
		type: "video",
		metadata: generateMeta("MKV", "MOV", "video")
	},
	{
		from: "AVI",
		to: "MP4",
		type: "video",
		metadata: generateMeta("AVI", "MP4", "video")
	},
	{
		from: "AVI",
		to: "MKV",
		type: "video",
		metadata: generateMeta("AVI", "MKV", "video")
	},
	{
		from: "AVI",
		to: "FLV",
		type: "video",
		metadata: generateMeta("AVI", "FLV", "video")
	},
	{
		from: "AVI",
		to: "WEBM",
		type: "video",
		metadata: generateMeta("AVI", "WEBM", "video")
	},
	{
		from: "AVI",
		to: "MOV",
		type: "video",
		metadata: generateMeta("AVI", "MOV", "video")
	},
	{
		from: "FLV",
		to: "MP4",
		type: "video",
		metadata: generateMeta("FLV", "MP4", "video")
	},
	{
		from: "FLV",
		to: "MKV",
		type: "video",
		metadata: generateMeta("FLV", "MKV", "video")
	},
	{
		from: "FLV",
		to: "AVI",
		type: "video",
		metadata: generateMeta("FLV", "AVI", "video")
	},
	{
		from: "FLV",
		to: "WEBM",
		type: "video",
		metadata: generateMeta("FLV", "WEBM", "video")
	},
	{
		from: "FLV",
		to: "MOV",
		type: "video",
		metadata: generateMeta("FLV", "MOV", "video")
	},
	{
		from: "WEBM",
		to: "MP4",
		type: "video",
		metadata: generateMeta("WEBM", "MP4", "video")
	},
	{
		from: "WEBM",
		to: "MKV",
		type: "video",
		metadata: generateMeta("WEBM", "MKV", "video")
	},
	{
		from: "WEBM",
		to: "AVI",
		type: "video",
		metadata: generateMeta("WEBM", "AVI", "video")
	},
	{
		from: "WEBM",
		to: "FLV",
		type: "video",
		metadata: generateMeta("WEBM", "FLV", "video")
	},
	{
		from: "WEBM",
		to: "MOV",
		type: "video",
		metadata: generateMeta("WEBM", "MOV", "video")
	},
	{
		from: "MOV",
		to: "MP4",
		type: "video",
		metadata: generateMeta("MOV", "MP4", "video")
	},
	{
		from: "MOV",
		to: "MKV",
		type: "video",
		metadata: generateMeta("MOV", "MKV", "video")
	},
	{
		from: "MOV",
		to: "AVI",
		type: "video",
		metadata: generateMeta("MOV", "AVI", "video")
	},
	{
		from: "MOV",
		to: "FLV",
		type: "video",
		metadata: generateMeta("MOV", "FLV", "video")
	},
	{
		from: "MOV",
		to: "WEBM",
		type: "video",
		metadata: generateMeta("MOV", "WEBM", "video")
	},
	{
		from: "JPEG",
		to: "PNG",
		type: "image",
		metadata: generateMeta("JPEG", "PNG", "image")
	},
	{
		from: "JPEG",
		to: "WEBP",
		type: "image",
		metadata: generateMeta("JPEG", "WEBP", "image")
	},
	{
		from: "JPEG",
		to: "SVG",
		type: "image",
		metadata: generateMeta("JPEG", "SVG", "image")
	},
	{
		from: "JPEG",
		to: "PDF",
		type: "document",
		metadata: generateMeta("JPEG", "PDF", "document")
	},
	{
		from: "PNG",
		to: "JPEG",
		type: "image",
		metadata: generateMeta("PNG", "JPEG", "image")
	},
	{
		from: "PNG",
		to: "WEBP",
		type: "image",
		metadata: generateMeta("PNG", "WEBP", "image")
	},
	{
		from: "PNG",
		to: "SVG",
		type: "image",
		metadata: generateMeta("PNG", "SVG", "image")
	},
	{
		from: "PNG",
		to: "PDF",
		type: "document",
		metadata: generateMeta("PNG", "PDF", "document")
	},
	{
		from: "WEBP",
		to: "JPEG",
		type: "image",
		metadata: generateMeta("WEBP", "JPEG", "image")
	},
	{
		from: "WEBP",
		to: "PNG",
		type: "image",
		metadata: generateMeta("WEBP", "PNG", "image")
	},
	{
		from: "WEBP",
		to: "SVG",
		type: "image",
		metadata: generateMeta("WEBP", "SVG", "image")
	},
	{
		from: "WEBP",
		to: "PDF",
		type: "document",
		metadata: generateMeta("WEBP", "PDF", "document")
	},
	{
		from: "BMP",
		to: "SVG",
		type: "image",
		metadata: generateMeta("BMP", "SVG", "image")
	},
	{
		from: "BMP",
		to: "WEBP",
		type: "image",
		metadata: generateMeta("BMP", "WEBP", "image")
	},
	{
		from: "BMP",
		to: "PNG",
		type: "image",
		metadata: generateMeta("BMP", "PNG", "image")
	},
	{
		from: "BMP",
		to: "JPEG",
		type: "image",
		metadata: generateMeta("BMP", "JPEG", "image")
	},
	{
		from: "BMP",
		to: "JPG",
		type: "image",
		metadata: generateMeta("BMP", "JPG", "image")
	},
	{
		from: "PNG",
		to: "BMP",
		type: "image",
		metadata: generateMeta("PNG", "BMP", "image")
	},
	{
		from: "JPEG",
		to: "BMP",
		type: "image",
		metadata: generateMeta("JPEG", "BMP", "image")
	},
	{
		from: "WEBP",
		to: "BMP",
		type: "image",
		metadata: generateMeta("WEBP", "BMP", "image")
	},
	{
		from: "JPG",
		to: "BMP",
		type: "image",
		metadata: generateMeta("JPG", "BMP", "image")
	},
	{
		from: "M4A",
		to: "MP3",
		type: "audio",
		metadata: generateMeta("M4A", "MP3", "audio")
	},
	{
		from: "M4A",
		to: "WAV",
		type: "audio",
		metadata: generateMeta("M4A", "WAV", "audio")
	},
	{
		from: "M4A",
		to: "AAC",
		type: "audio",
		metadata: generateMeta("M4A", "AAC", "audio")
	},
	{
		from: "MP3",
		to: "M4A",
		type: "audio",
		metadata: generateMeta("MP3", "M4A", "audio")
	},
	{
		from: "MP3",
		to: "WAV",
		type: "audio",
		metadata: generateMeta("MP3", "WAV", "audio")
	},
	{
		from: "MP3",
		to: "AAC",
		type: "audio",
		metadata: generateMeta("MP3", "AAC", "audio")
	},
	{
		from: "WAV",
		to: "M4A",
		type: "audio",
		metadata: generateMeta("WAV", "M4A", "audio")
	},
	{
		from: "WAV",
		to: "MP3",
		type: "audio",
		metadata: generateMeta("WAV", "MP3", "audio")
	},
	{
		from: "WAV",
		to: "AAC",
		type: "audio",
		metadata: generateMeta("WAV", "AAC", "audio")
	},
	{
		from: "AAC",
		to: "M4A",
		type: "audio",
		metadata: generateMeta("AAC", "M4A", "audio")
	},
	{
		from: "AAC",
		to: "MP3",
		type: "audio",
		metadata: generateMeta("AAC", "MP3", "audio")
	},
	{
		from: "AAC",
		to: "WAV",
		type: "audio",
		metadata: generateMeta("AAC", "WAV", "audio")
	},
	{
		from: "Markdown",
		to: "HTML",
		type: "document",
		metadata: generateMeta("Markdown", "HTML", "document")
	},
	{
		from: "Markdown",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("Markdown", "DOCX", "document")
	},
	{
		from: "Markdown",
		to: "ODT",
		type: "document",
		metadata: generateMeta("Markdown", "ODT", "document")
	},
	{
		from: "Markdown",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("Markdown", "EPUB", "document")
	},
	{
		from: "Markdown",
		to: "LaTeX",
		type: "document",
		metadata: generateMeta("Markdown", "LaTeX", "document")
	},
	{
		from: "Markdown",
		to: "RTF",
		type: "document",
		metadata: generateMeta("Markdown", "RTF", "document")
	},

	// HTML to common formats
	{
		from: "HTML",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("HTML", "Markdown", "document")
	},
	{
		from: "HTML",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("HTML", "DOCX", "document")
	},
	{
		from: "HTML",
		to: "ODT",
		type: "document",
		metadata: generateMeta("HTML", "ODT", "document")
	},
	{
		from: "HTML",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("HTML", "EPUB", "document")
	},
	{
		from: "HTML",
		to: "RTF",
		type: "document",
		metadata: generateMeta("HTML", "RTF", "document")
	},

	// DOCX to common formats
	{
		from: "DOCX",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("DOCX", "Markdown", "document")
	},
	{
		from: "DOCX",
		to: "HTML",
		type: "document",
		metadata: generateMeta("DOCX", "HTML", "document")
	},
	{
		from: "DOCX",
		to: "ODT",
		type: "document",
		metadata: generateMeta("DOCX", "ODT", "document")
	},
	{
		from: "DOCX",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("DOCX", "EPUB", "document")
	},
	{
		from: "DOCX",
		to: "RTF",
		type: "document",
		metadata: generateMeta("DOCX", "RTF", "document")
	},

	// ODT to common formats
	{
		from: "ODT",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("ODT", "Markdown", "document")
	},
	{
		from: "ODT",
		to: "HTML",
		type: "document",
		metadata: generateMeta("ODT", "HTML", "document")
	},
	{
		from: "ODT",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("ODT", "DOCX", "document")
	},
	{
		from: "ODT",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("ODT", "EPUB", "document")
	},
	{
		from: "ODT",
		to: "RTF",
		type: "document",
		metadata: generateMeta("ODT", "RTF", "document")
	},

	// LaTeX to common formats
	{
		from: "LaTeX",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("LaTeX", "Markdown", "document")
	},
	{
		from: "LaTeX",
		to: "HTML",
		type: "document",
		metadata: generateMeta("LaTeX", "HTML", "document")
	},
	{
		from: "LaTeX",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("LaTeX", "DOCX", "document")
	},
	{
		from: "LaTeX",
		to: "ODT",
		type: "document",
		metadata: generateMeta("LaTeX", "ODT", "document")
	},
	{
		from: "LaTeX",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("LaTeX", "EPUB", "document")
	},

	// RST to common formats
	{
		from: "RST",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("RST", "Markdown", "document")
	},
	{
		from: "RST",
		to: "HTML",
		type: "document",
		metadata: generateMeta("RST", "HTML", "document")
	},
	{
		from: "RST",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("RST", "DOCX", "document")
	},
	{
		from: "RST",
		to: "ODT",
		type: "document",
		metadata: generateMeta("RST", "ODT", "document")
	},
	{
		from: "RST",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("RST", "EPUB", "document")
	},

	// EPUB to common formats
	{
		from: "EPUB",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("EPUB", "Markdown", "document")
	},
	{
		from: "EPUB",
		to: "HTML",
		type: "document",
		metadata: generateMeta("EPUB", "HTML", "document")
	},
	{
		from: "EPUB",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("EPUB", "DOCX", "document")
	},
	{
		from: "EPUB",
		to: "ODT",
		type: "document",
		metadata: generateMeta("EPUB", "ODT", "document")
	},
	{
		from: "EPUB",
		to: "RTF",
		type: "document",
		metadata: generateMeta("EPUB", "RTF", "document")
	},

	// MediaWiki to common formats
	{
		from: "MediaWiki",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("MediaWiki", "Markdown", "document")
	},
	{
		from: "MediaWiki",
		to: "HTML",
		type: "document",
		metadata: generateMeta("MediaWiki", "HTML", "document")
	},
	{
		from: "MediaWiki",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("MediaWiki", "DOCX", "document")
	},
	{
		from: "MediaWiki",
		to: "ODT",
		type: "document",
		metadata: generateMeta("MediaWiki", "ODT", "document")
	},
	{
		from: "MediaWiki",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("MediaWiki", "EPUB", "document")
	},

	// Org Mode to common formats
	{
		from: "Org Mode",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("Org Mode", "Markdown", "document")
	},
	{
		from: "Org Mode",
		to: "HTML",
		type: "document",
		metadata: generateMeta("Org Mode", "HTML", "document")
	},
	{
		from: "Org Mode",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("Org Mode", "DOCX", "document")
	},
	{
		from: "Org Mode",
		to: "ODT",
		type: "document",
		metadata: generateMeta("Org Mode", "ODT", "document")
	},
	{
		from: "Org Mode",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("Org Mode", "EPUB", "document")
	},

	// Textile to common formats
	{
		from: "Textile",
		to: "Markdown",
		type: "document",
		metadata: generateMeta("Textile", "Markdown", "document")
	},
	{
		from: "Textile",
		to: "HTML",
		type: "document",
		metadata: generateMeta("Textile", "HTML", "document")
	},
	{
		from: "Textile",
		to: "DOCX",
		type: "document",
		metadata: generateMeta("Textile", "DOCX", "document")
	},
	{
		from: "Textile",
		to: "ODT",
		type: "document",
		metadata: generateMeta("Textile", "ODT", "document")
	},
	{
		from: "Textile",
		to: "EPUB",
		type: "document",
		metadata: generateMeta("Textile", "EPUB", "document")
	}
];



export { conversions };
