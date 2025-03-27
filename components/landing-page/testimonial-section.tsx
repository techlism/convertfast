'use client'
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ShineBorder } from "../ui/shine-border"

export function TestimonialSection() {
  const testimonials = [
    {
      quote: "This tool is a lifesaver! Compresses images perfectly for government sites—fast, secure, and works right in your browser.",
      author: "Sourabh Sinha",
      role: "Software Engineer",
      avatar: "SS",
    },
    {
      quote:"Sounds like a great idea, both for bandwidth and also for privacy reasons!",
      author: "Andreas Thomas",
      role: "Co-Founder Unkey",
      avatar: "AT",
    },
    {
      quote: "Convifi is my go to tool for file conversions. It focuses on privacy of users which is rare these days.",
      author: "Vishal",
      role: "Software Developer",
      avatar: "V",
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
            >

              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-full relative overflow-hidden group">
              <ShineBorder shineColor={['#facc14']}/>
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
                        fill="currentColor"
                        className="inline-block mr-1 text-green-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6">{`"${testimonial.quote}"`}</p>
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

