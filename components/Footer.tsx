import Link from "next/link"
import { Github, FileLock2, ChevronRightIcon, Copyright } from "lucide-react"
import { conversions } from "@/lib/conversion-formats"
import { Separator } from "./ui/separator"
import Image from "next/image"

export default async function Footer() {
    // Sort conversions by the length of the conversion string (e.g., "Convert MP4 to MP3")
    const sortedConversions = [...conversions].sort((a, b) => {
        const conversionA = `Convert ${a.from} to ${a.to}`
        const conversionB = `Convert ${b.from} to ${b.to}`
        return conversionA.length - conversionB.length
    })

    return (
        <footer className="border-t border-border bg-background py-6">
            <div className="max-w-7xl lg:mx-auto md:mx-auto sm:mx-auto mx-4">


                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Link className="flex items-center gap-2" href={'/'}>
                                <Image className="dark:invert" src="/convifi.svg" alt="Logo" height={35} width={35} />
                                <span className="text-xl font-semibold">
                                    Convifi
                                </span>
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Convert, compress, and transform your files locally without uploading them to any server.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <Link href="https://github.com/convertfast" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>            
                </div>
                <div className="my-6">
                    <h3 className="text-lg font-medium text-foreground mb-3">Conversion Links</h3>
                    <div className="gap-2 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3"> {/* Vertical stacking of conversion links */}
                        {sortedConversions.map((conversion) => (
                            <div className="flex items-center space-x-2" key={`conversion_formats_footer_${conversion.from}_${conversion.to}`}>
                                <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                                <Link
                                    className="font-medium hover:underline underline-offset-4 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm text-muted-foreground hover:text-foreground"
                                    href={`/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`}
                                >
                                    Convert {conversion.from} to {conversion.to}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">©{new Date().getFullYear()} Convifi. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Privacy Privacy
                        </Link>
                        <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href={'/blog'} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Blog
                        </Link>
                    </div>
                </div>
                </div>
        </footer>
    )
}
