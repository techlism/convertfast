import ReportPageDetails from "@/components/ReportPageDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback - Convifi",
    description: "Send feedback to Convifi. Facing any issue or have a suggestion? Would love to hear from you.",
    keywords: ["feedback", "issue", "suggestion", "contact", "Convifi", "Convifi feedback", "Convifi issue", "Convifi suggestion", "Convifi contact"],
}

export default function Page() {    
    return(
        <ReportPageDetails/>
    )
}