import { Home, MoveDown } from "lucide-react";
import Link from "next/link";

export default function UnsupportedFormat(){
    return(
        <main className="flex flex-col justify-center items-center min-h-screen p-4 space-y-5 auto-gradient">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Unsupported Format</h1>
                <p className="text-lg mt-2">The format you are trying to convert to is not yet supported or it is an invalid file format</p>              
            </div>
            <div>
                <div className="grid grid-cols-2 items-center gap-4">
                    <Link href={'#footer'} className="mt-5 border rounded-lg flex p-5 font-medium"><MoveDown className="mr-2"/><span className="sr-only">Go to Footer</span> Check the supported Formats</Link>
                    <Link href={'/'} className="mt-5 border rounded-lg flex p-5 font-medium"><Home className="mr-2"/><span className="sr-only">Back to Home</span>  Go to Home</Link>
                </div>
            </div>                
        </main>        
    )
}