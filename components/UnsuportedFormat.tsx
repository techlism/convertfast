import { Home, MoveDown } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function UnsupportedFormat(){
    function scrollToFooter(){
        const footer = document.getElementById('footer');
        footer?.scrollIntoView({behavior: 'smooth'});
    }
    return(
        <main className="flex flex-col justify-center items-center min-h-screen p-4 space-y-5 auto-gradient">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Unsupported Format</h1>
                <p className="text-lg mt-2">The format you are trying to convert to is not yet supported or it is an invalid file format.</p>              
            </div>
            <div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 items-center gap-4"> */}
                    <Button onClick={scrollToFooter}  className="mt-5  rounded-lg flex p-5 font-medium" variant={'outline'}><MoveDown className="mr-2 font-bold"/><span className="sr-only">Go to Footer</span> Check out all the supported formats</Button>
                {/* </div> */}
            </div>                
        </main>        
    )
}