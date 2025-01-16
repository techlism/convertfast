import type { Metadata } from "next";

export interface Conversion {
  from: string;
  to: string;
  metadata: Metadata;
  type: 'image' | 'video' | 'audio' | 'document';
}

function generateMeta(from: string, to: string, type: "image" | "video" | "audio" | "document"): Metadata {
  const descriptions: Record<string, string> = {
    video: `Easily convert ${from} to ${to} online without any software download. Supports fast and high-quality video conversions with complete privacy.`,
    image: `Convert ${from} to ${to} seamlessly online. High-quality image conversions for all your needs. No software download required and fully private.`,
    audio: `Transform ${from} to ${to} quickly and efficiently. Perfect for converting audio files online with high-quality output and full data security.`,
    document: `Switch ${from} to ${to} format effortlessly. Convert documents online without installing any software, ensuring privacy and high-quality results.`,
  };

  const keywords = [
    `convert ${from.toLowerCase()} to ${to.toLowerCase()} online`,
    `free ${from.toLowerCase()} to ${to.toLowerCase()} converter`,
    `${from.toLowerCase()} to ${to.toLowerCase()} conversion tool`,
    `how to convert ${from.toLowerCase()} to ${to.toLowerCase()}`,
    `${from.toLowerCase()} to ${to.toLowerCase()} conversion online`,
    `best ${from.toLowerCase()} to ${to.toLowerCase()} converter`,
    `${from.toLowerCase()} to ${to.toLowerCase()} converter no download`,
    `${from.toLowerCase()} to ${to.toLowerCase()} secure conversion`,
    `${from.toLowerCase()} to ${to.toLowerCase()} format change`,
    `online tool for ${from.toLowerCase()} to ${to.toLowerCase()}`
  ];

  const additionalFields = {
    author: "Techlism",
    robots: "index, follow",
    language: "en",
  };

  return {
    title: `Convert ${from} to ${to} | Best Online ${type.charAt(0).toUpperCase() + type.slice(1)} Converter`,
    description: descriptions[type],
    keywords: keywords,
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
];

export { conversions };
