"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export function StatsSection() {
  const scrollToConverter = () => {
    const converter = document.getElementById('homepage_converter');
    converter?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const stats = [
    { number: "100+", label: "File Formats" },
    { number: "0", label: "Server Uploads" },
    { number: "100%", label: "Browser-Based" },
    { number: "24/7", label: "Availability" },
  ]

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="py-20 bg-muted/10 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-primary/20 bg-primary/10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            YOUR TRUST IS THE PRIORITY
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your files stay with you and only with you. We prioritize your privacy and security above all else.
          </motion.p>
          <motion.div
            className="pt-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" onClick={scrollToConverter} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto">
              Try Convifi Now
            </Button>
          </motion.div>
          <motion.div
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <motion.div
        className="absolute top-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]), opacity }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]), opacity }}
      />
    </section>
  )
}

