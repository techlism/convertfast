import Link from "next/link";
import { Copyright, FileLock2, ChevronRightIcon } from "lucide-react";
import { conversions } from "@/lib/conversion-formats";
import { Separator } from "./ui/separator";
export default function Footer() {
return (
    <footer className="border-t max-w-screen mx-auto" id="footer">
        <div className="max-w-7xl flex items-center justify-center align-middle mx-auto p-5">
            <div className="container  grid gap-10 lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 md:grid-cols-2 justify-center items-center align-middle">
                <div className="flex items-center space-x-4">
                    <FileLock2 />
                    <div className="grid gap-1">
                        <h3 className="text-base font-semibold tracking-wide uppercase">
                            Your trust is the priority.
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your files stay with you and only with you.
                        </p>
                    </div>
                </div>
                <div className="grid gap-3 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4">
                    {conversions.map((conversion, index) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: It would work just fine
                        <div className="flex items-center space-x-2 align-middle" key={`conversion_formats_footer_${index}`}>
                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                            <Link
                                className="font-medium hover:underline underline-offset-4 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm" 
                                href={`/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`}
                            >
                                Convert {conversion.from} to {conversion.to}
                            </Link>
                        </div>
                    ))}
                </div>
                
            </div>            
        </div> 
        <Separator/>
        <div className="flex text-center text-gray-200 text-base font-medium items-center justify-center my-4 opacity-80"> <Copyright size={16}/><span>{new Date().getFullYear()} Convertfast</span></div>
    </footer>
);
}



