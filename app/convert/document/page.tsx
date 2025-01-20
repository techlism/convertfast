import PandocConverter from "@/components/DocumentConverter";
import DocumentConverterInfoSection from "@/components/DocumentConverterInfoSection";
import NOSSRWrapper from "@/components/NOSSRWrapper";

export default function Page(){
    return(
		<main className="flex justify-center align-middle items-center min-h-screen max-w-[90%] py-4 mx-auto">
            <NOSSRWrapper>
                <div>
                    <DocumentConverterInfoSection/>
                    <PandocConverter/>
                </div>
            </NOSSRWrapper>
        </main>

    )
}