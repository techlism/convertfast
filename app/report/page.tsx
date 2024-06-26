import ReportPageDetails from "@/components/ReportPageDetails";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback - Convertfast",
    description: "Send feedback to Convertfast. Facing any issue or have a suggestion? Would love to hear from you.",
    keywords: ["feedback", "issue", "suggestion", "contact", "convertfast", "convertfast feedback", "convertfast issue", "convertfast suggestion", "convertfast contact"],
}

export default function Page() {    
    return(
        <ReportPageDetails/>
    )
}