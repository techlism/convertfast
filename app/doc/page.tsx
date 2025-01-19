import PandocConverter from "@/components/DocumentConverter";
import NOSSRWrapper from "@/components/NOSSRWrapper";

export default function Page(){
    return(
        <main className="m-4">
            <NOSSRWrapper>
                <PandocConverter/>
            </NOSSRWrapper>
        </main>

    )
}