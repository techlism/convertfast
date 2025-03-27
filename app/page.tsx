"use client"

import { FloatingCards } from "@/components/landing-page/floating-cards"

import { FeatureSection } from "@/components/landing-page/feature-section"
import { TestimonialSection } from "@/components/landing-page/testimonial-section"
import { StatsSection } from "@/components/landing-page/stats-section"
import { motion } from "framer-motion"
import { FileConversion } from "@/components/landing-page/file-conversion"
import { conversions } from "@/lib/conversion-formats"
import CTA from "@/components/landing-page/cta"

export default function Home() {
	return (
		<main className="max-w-7xl w-full mx-auto my-auto">
			<section className="relative py-10 md:py-20 overflow-hidden">
				<motion.div
					className="relative h-[400px] mb-6 mx-auto"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.6 }}
				>
					<FloatingCards />
				</motion.div>
				<motion.div
					className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-20 right-[10%] w-72 h-72 rounded-full bg-accent/5 blur-3xl z-0"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.4, 0.2, 0.4],
					}}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				/>

				{/* Floating elements */}
				<div className="absolute inset-0 overflow-hidden z-0">
					{[...Array(6)].map((_, i) => (
						<motion.div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={`float-${i}`}
							className="absolute rounded-full bg-primary/10"
							style={{
								width: `${20 + Math.random() * 30}px`,
								height: `${20 + Math.random() * 30}px`,
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							initial={{ opacity: 0, y: 100 }}
							animate={{
								opacity: [0, 0.5, 0],
								y: [100, -100],
								x: [0, Math.random() * 50 - 25],
							}}
							transition={{
								duration: 10 + Math.random() * 20,
								repeat: Number.POSITIVE_INFINITY,
								delay: i * 2,
								ease: "easeInOut",
							}}
						/>
					))}
				</div>

				<div className="relative px-4 md:px-6 z-10">
					<motion.div
						className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<motion.div
							className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary border border-primary/20 mb-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							Fast. Secure. Local.
						</motion.div>
						<motion.h1
							className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							Convert, Compress and <span className="text-primary">Chill.</span>
						</motion.h1>
						<motion.p
							className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							Convert and compress your files instantly, all done securely on your device with no uploads or data sharing.
						</motion.p>
						<CTA/>
					</motion.div>



				</div>
			</section>

			<FeatureSection />

			<FileConversion conversions={conversions} />

			<TestimonialSection />

			<StatsSection />
		</main>
	)
}

