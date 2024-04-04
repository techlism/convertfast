import Link from "next/link";
import { FileLock2 } from "lucide-react";
import { conversions } from "@/lib/conversion-formats";
export default function Footer() {
return (
    <footer className="auto-gradient">
        <div className="container grid gap-10 px-4 py-12 md:px-6 md:gap-16 lg:grid-cols-2">
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
            <div className="grid gap-4 text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 md:grid-cols-3">
                {conversions.map((conversion, index) => (
                    <div className="flex items-center space-x-2 align-middle" key={index}>
                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                        <Link
                            className="font-medium hover:underline underline-offset-4"
                            href={`/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`}
                        >
                            Convert {conversion.from} to {conversion.to}
                        </Link>
                    </div>
                ))}
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

