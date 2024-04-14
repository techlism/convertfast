import Link from "next/link";

export default function Page() {
    return(
        <main className="min-h-screen flex flex-col align-middle justify-center items-center space-y-4">
            <h1 className="text-4xl font-bold text-center">Send Feedback</h1>
            <p className="text-gray-500 text-center">
                Facing any issue or have a suggestion? Would love to hear from you.
            </p>
            <Link href={'mailto:feedback@convertfast.media?subject=Feedback/Issue'} className="rounded-md bg-primary text-white dark:text-black p-4 shadow-sm font-semibold" target="_blank">
                Drop an email
            </Link>
        </main>
    )
}