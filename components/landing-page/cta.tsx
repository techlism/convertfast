'use client'
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ctas = ['Convert Your Videos Locally', 'Remove Backgrounds Instantly', 'Compress Images', 'Convert Audio Files', 'Turn Documents into Desired Format']

export default function CTA() {
    const router = useRouter();
    const [currentCtaIndex, setCurrentCtaIndex] = useState(0);
    
    const scrollToConverter = () => {
        const converter = document.getElementById('homepage_converter');
        converter?.scrollIntoView({behavior: 'smooth', block: 'start'});            
    }
    
    const redirectToAbout = () => router.push('/blog/about');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCtaIndex((prevIndex) => (prevIndex + 1) % ctas.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={scrollToConverter}>
                <motion.span
                    key={currentCtaIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {ctas[currentCtaIndex]}
                </motion.span>
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
                size="lg"
                variant="outline"
                onClick={redirectToAbout}
                className="border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
            >
                Learn more
            </Button>
        </motion.div>
    )
}