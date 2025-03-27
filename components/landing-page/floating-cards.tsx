"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { FileText, FileImage, FileVideo, FileAudio, FileArchive, FileIcon as FilePdf } from "lucide-react"
import { useInView } from "framer-motion"

// Card types with their properties
const cardTypes = [
  {
    id: "images",
    title: "Images",
    description: "JPG, PNG, WEBP, SVG",
    icon: FileImage,
    color: "bg-primary/10",
    textColor: "text-primary",
    borderColor: "border-primary/20",
    initialPosition: { x: -100, y: -50, rotate: -5 },
  },
  {
    id: "videos",
    title: "Videos",
    description: "MP4, MOV, AVI, WEBM",
    icon: FileVideo,
    color: "bg-blue-500/10",
    textColor: "text-blue-500-foreground",
    borderColor: "border-blue-500/20",
    initialPosition: { x: 100, y: -120, rotate: 5 },
  },
  {
    id: "audio",
    title: "Audio",
    description: "MP3, WAV, M4A, AAC",
    icon: FileAudio,
    color: "bg-secondary/10",
    textColor: "text-secondary-foreground",
    borderColor: "border-secondary/20",
    initialPosition: { x: -150, y: 100, rotate: 8 },
  },
  {
    id: "documents",
    title: "Documents",
    description: "MARKDOWN, DOCX, CSV",
    icon: FilePdf,
    color: "bg-green-500/10",
    textColor: "text-green-500",
    borderColor: "border-green-500/20",
    initialPosition: { x: 180, y: 50, rotate: -8 },
  },
  {
    id: "archives",
    title: "Compress",
    description: "JPEG, JPG, PNG",
    icon: FileArchive,
    color: "bg-purple-500/30",
    textColor: "text-purple-500-foreground",
    borderColor: "border-purple-500/40",
    initialPosition: { x: 0, y: 150, rotate: -3 },
  },
]


const FloatingCard = ({ 
  card, 
  mousePosition,
  index 
}: { 
  card: typeof cardTypes[number];
  mousePosition: { x: number; y: number };
  index: number;
}) => {
  const xOffset = useMotionValue(0);
  const yOffset = useMotionValue(0);
  const rotateValue = useMotionValue(card.initialPosition.rotate);

  const x = useSpring(xOffset, { damping: 20, stiffness: 100 });
  const y = useSpring(yOffset, { damping: 20, stiffness: 100 });
  const rotate = useSpring(rotateValue, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const parallaxFactor = 0.02;
    const xTarget = card.initialPosition.x - mousePosition.x * parallaxFactor * (index % 2 === 0 ? 1 : -1);
    const yTarget = card.initialPosition.y - mousePosition.y * parallaxFactor * (index % 2 === 0 ? 1 : -1);

    xOffset.set(xTarget);
    yOffset.set(yTarget);
  }, [mousePosition, card.initialPosition.x, card.initialPosition.y, index, xOffset, yOffset]);

  return (
    <motion.div
      className={`absolute w-64 p-4 rounded-xl ${card.color} backdrop-blur-sm border ${card.borderColor} shadow-lg`}
      initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: 1,
        x: card.initialPosition.x,
        y: card.initialPosition.y,
        rotate: card.initialPosition.rotate,
        transition: {
          delay: index * 0.2,
          duration: 0.8,
          ease: "easeOut",
        }
      }}
      style={{ x, y, rotate }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${card.color} ${card.textColor}`}>
          <card.icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`font-medium ${card.textColor}`}>{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center perspective"
    >
      {/* Central circle with glow */}
      <div className="absolute w-[clamp(120px,20vw,160px)] h-[clamp(120px,20vw,160px)] rounded-full bg-primary/5 flex items-center justify-center z-10">
        <div className="absolute w-full h-full rounded-full bg-primary/10 animate-pulse-slow" />
        <div className="relative w-[clamp(80px,15vw,96px)] h-[clamp(80px,15vw,96px)] rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
          <FileText className="w-[clamp(32px,5vw,40px)] h-[clamp(32px,5vw,40px)] text-primary" />
        </div>
      </div>

      {/* Orbital ring */}
      <div className="absolute max-w-[90vw] max-h-[90vw] w-[400px] h-[350px] rounded-full border border-border/20 animate-[spin_60s_linear_infinite]" />
      <div className="absolute max-w-[70vw] max-h-[70vw] w-[300px] h-[250px] rounded-full border border-border/30 animate-[spin_40s_linear_infinite_reverse]" />

      {/* Floating cards */}
      {cardTypes.map((card, index) => (
        <FloatingCard
          key={card.id}
          card={card}
          index={index}
          mousePosition={mousePosition}
        />
      ))}


      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          initial={{
            opacity: 0,
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500,
            transition: {
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            },
          }}
        />
      ))}
    </div>
  )
}

