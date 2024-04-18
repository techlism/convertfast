'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";

export default function ReportPageDetails() {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText('feedback@convertfast.media');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return(
        <main className="min-h-screen flex flex-col align-middle justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold text-center">Send Feedback</h1>
        <p className="text-gray-500 text-center">
            Facing any issue or have a suggestion? Would love to hear from you.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 2xl:grid-cols-2 items-center gap-4">
            <Link href={'mailto:feedback@convertfast.media?subject=Feedback/Issue'} className="rounded-md bg-primary text-white dark:text-black p-2 shadow-sm font-medium text-base text-center" target="_blank">
                Drop an email
            </Link>
            <Button className="text-base" onClick={handleCopy}>
                Copy email address {copied ? <CopyCheck size={20} className="ml-2"/> : <Copy size={20} className="ml-2"/>}
            </Button>
        </div>
    </main>
    )
}