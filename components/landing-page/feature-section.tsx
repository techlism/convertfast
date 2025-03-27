"use client"

import { motion } from "framer-motion"
import { Shield, Lock, MegaphoneOff, FileCheck } from "lucide-react"
import { ShineBorder } from "../ui/shine-border"

export function FeatureSection() {
  const features = [
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Support for almost all popular media formats",
      description: "Convifi supports all popular media formats including MP4, MP3, JPEG, PNG, MKV etc.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "100% Private",
      description: "Your files never leave your device. All processing happens locally for complete privacy.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure by Design",
      description: "No uploads, no servers, no data collection. Your files remain exclusively on your device.",
    },
    {
      icon: <MegaphoneOff className="h-10 w-10 text-primary" />,
      title: "No awkward Ads",
      description: "Currently, the website is free of advertisements. Even if ads are introduced in the future, they will be kept to a minimum.",
    },
  ]

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Convifi?
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Designed with privacy and performance in mind, Convifi is the tool you&apos;ve been looking for.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.description}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 transition-all overflow-hidden"
            >
              <ShineBorder shineColor={['#facc14']} />

              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

