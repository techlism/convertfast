import Link from "next/link";
import { FileLock2 } from "lucide-react";
import { conversions } from "@/lib/conversion-formats";
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
                        <div className="flex items-center space-x-2 align-middle" key={index}>
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
    </footer>
);
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

