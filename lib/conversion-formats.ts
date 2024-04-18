interface Conversion {
  from: string;
  to: string;
}
const conversions: Conversion[] = [
  {
    from: "MP4",
    to: "MKV",
  },
  {
    from: "MP4",
    to: "AVI",
  },
  {
    from: "MP4",
    to: "FLV",
  },
  {
    from: "MP4",
    to: "WEBM",
  },
  {
    from: "MP4",
    to: "MOV",
  },
  {
    from: "MKV",
    to: "MP4",
  },
  {
    from: "MKV",
    to: "AVI",
  },
  {
    from: "MKV",
    to: "FLV",
  },
  {
    from: "MKV",
    to: "WEBM",
  },
  {
    from: "MKV",
    to: "MOV",
  },
  {
    from: "AVI",
    to: "MP4",
  },
  {
    from: "AVI",
    to: "MKV",
  },
  {
    from: "AVI",
    to: "FLV",
  },
  {
    from: "AVI",
    to: "WEBM",
  },
  {
    from: "AVI",
    to: "MOV",
  },
  {
    from: "FLV",
    to: "MP4",
  },
  {
    from: "FLV",
    to: "MKV",
  },
  {
    from: "FLV",
    to: "AVI",
  },
  {
    from: "FLV",
    to: "WEBM",
  },
  {
    from: "FLV",
    to: "MOV",
  },
  {
    from: "WEBM",
    to: "MP4",
  },
  {
    from: "WEBM",
    to: "MKV",
  },
  {
    from: "WEBM",
    to: "AVI",
  },
  {
    from: "WEBM",
    to: "FLV",
  },
  {
    from: "WEBM",
    to: "MOV",
  },
  {
    from: "MOV",
    to: "MP4",
  },
  {
    from: "MOV",
    to: "MKV",
  },
  {
    from: "MOV",
    to: "AVI",
  },
  {
    from: "MOV",
    to: "FLV",
  },
  {
    from: "MOV",
    to: "WEBM",
  },
  { from: "JPEG", to: "PNG" },
  {
    from: "JPEG",
    to: "WEBP",
  },
  { from: "JPEG", to: "SVG" },
  { from: "JPEG", to: "PDF" },
  { from: "PNG", to: "JPEG" },
  { from: "PNG", to: "WEBP" },
  { from: "PNG", to: "SVG" },
  { from: "PNG", to: "PDF" },
  { from: "WEBP", to: "JPEG" },
  { from: "WEBP", to: "PNG" },
  { from: "WEBP", to: "SVG" },
  { from: "WEBP", to: "PDF" },
  {
    from: "BMP",
    to: "SVG",
  },
  {
    from: "BMP",
    to: "WEBP",
  },
  {
    from: "BMP",
    to: "PNG",
  },
  {
    from: "BMP",
    to: "JPEG",
  },
  {
    from: "BMP",
    to: "JPG",
  },
  {
    from: "PNG",
    to: "BMP",
  },
  {
    from: "JPEG",
    to: "BMP",
  },
  {
    from: "WEBP",
    to: "BMP",
  },
  {
    from: "JPG",
    to: "BMP",
  },
  {
    from: "M4A",
    to: "MP3",
  },
  {
    from: "M4A",
    to: "WAV",
  },
  {
    from: "M4A",
    to: "AAC",
  },
  {
    from: "MP3",
    to: "M4A",
  },
  {
    from: "MP3",
    to: "WAV",
  },
  {
    from: "MP3",
    to: "AAC",
  },
  {
    from: "WAV",
    to: "M4A",
  },
  {
    from: "WAV",
    to: "MP3",
  },
  {
    from: "WAV",
    to: "AAC",
  },
  {
    from: "AAC",
    to: "M4A",
  },
  {
    from: "AAC",
    to: "MP3",
  },
  {
    from: "AAC",
    to: "WAV",
  },
  // skipped PDF to other formats for now due to ghostscript issue
  
];
export { conversions };
