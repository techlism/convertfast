"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { test } from "gray-matter"

export function TestimonialSection() {
  const testimonials = [
    {
      quote: "Convifi has completely changed how I handle file conversions. No more uploading to sketchy websites!",
      author: "Alex Johnson",
      role: "Graphic Designer",
      avatar: "AJ",
    },
    {
      quote:
        "I love that I can convert files offline. Perfect for when I'm traveling and have limited internet access.",
      author: "Sam Rivera",
      role: "Content Creator",
      avatar: "SR",
    },
    {
      quote: "The speed is incredible. What used to take minutes now happens in seconds, right in my browser.",
      author: "Taylor Chen",
      role: "Marketing Manager",
      avatar: "TC",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What the Users Say...
          </motion.h2>
          <motion.p
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of satisfied users who&apos;ve made the switch to Convifi.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(var(--card), 0.3)",
                transition: { duration: 0.2 },
              }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-full relative overflow-hidden group">
                {/* Add subtle shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer transition-opacity duration-300" />

                <CardContent className="p-6 relative z-10">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                      <svg
                        key={`star_${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            i}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block mr-1 text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6">&quot;{testimonial.quote}&qout;</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

