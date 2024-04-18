import { Separator } from "@/components/ui/separator";
import { BookText } from 'lucide-react';
import Link from "next/link";
export default function Page() {
    return (
    <main className="container max-w-7xl flex flex-col space-y-3">
            <h1 className="text-4xl font-bold text-left p-4">About this product </h1>
            <div className="flex space-x-2 p-4">
                <BookText/>
                <div className="w-1 bg-secondary"/>
                <p className="text-base text-gray-500">Kundan</p>
            </div>
            <Separator/>
            <div className="p-4">
                <p>Here I am going to discuss about the intuition of this product/project. Also nothing is perfect and this project is far from perfect too. So we will discuss the shortcomings first, the shortcomings the maybe a deal breaker for me sometimes.</p>
                <p>Then we will discuss the good parts of the project. The parts that I am proud of and the parts that I think are the best.</p>
            </div>

            <div className="rounded-lg bg-gray-200 dark:bg-gray-800 p-4">
                <h2 className="text-2xl font-bold text-left">Shortcomings</h2>
                <div>    
                    <p>As you may have noticed that each and every conversion/compression/manipulation is taking place in your hardware itself. You may think how it is working. Here&apos;s the secret sauce -&gt; Web Assembly. As of 17<sup>th</sup> April 2024, I am using two npm packages for the conversion which under the hood rely on <Link className="hover:underline text-blue-500" href={'https://ffmpeg.org'}>FFMPEG</Link> and <Link href={'https://www.imagemagick.org'} className="hover:underline text-blue-500">IMAGE-MAGICK</Link> (basically a web assembly compilation of both). </p>
                    <p>The two packages are</p>
                    <ul>
                        <li><Link href={'https://www.npmjs.com/package/@ffmpeg/ffmpeg'} className="hover:underline text-blue-500" target="_blank">ffmpeg wasm</Link></li>
                        <li><Link href={'https://www.npmjs.com/package/@imagemagick/magick-wasm'} className="hover:underline text-blue-500" target="_blank">magick wasm</Link></li>
                    </ul>
                    <h3 className="text-lg font-semibold" >Shortcoming 1:</h3>
                    <p>The Binary/WASM files for both the tools are massive in size.The wasm file for imagemagick itself is of 16MB. Which could be a bummer if you are in a slow internet. Also in general for compressing a 500KB image you are loading a 16MB WASM file. Same goes for wasm file of ffmpeg it is around 30MB which is huge.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold" >Shortcoming 2:</h3>
                    <p>The Speed - The real deal breaker that could be for most the users would be the speed. As compared to native CLI based FFMPEG, ffmpeg wasm is performing with only 10% of the speed at best. For images & audios, it is unnoticeable but for say videos especially where formats like MKV are involved it feels slow.</p>
                    <p>There could be many reason that why WASM is not fast. It could be because of resource allocation from browser or any other factor but I am bullish on Web Assembly.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold" >Shortcoming 3:</h3>
                    <p>No support for some popular file formats (yet). For example conversion of PDF/SVG to any other format is not supported yet due to the dependency of magick-wasm on other tools such as inkscape for SVG which makes it difficult in Web Assembly.</p>
                </div>
            </div>
            <div className="rounded-lg bg-gray-200 dark:bg-gray-800 p-4">
                <h2 className="text-2xl font-bold text-left">Good Parts</h2>
                <div>
                    <h3 className="text-lg font-semibold" >Good Part 1:</h3>
                    <p>It delivers on the promise and it really works.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold" >Good Part 2:</h3>
                    <p>It is a great learning experience for me. I have learned a lot and my first product/project I really want the world to use.</p>
                </div>
            </div>
            <p>P.S. I am available for a hire. <Link href={'https://portfolio.techlism.in/resume.pdf'} className="hover:underline text-blue-500" target="_blank">My Resume.</Link></p>
    </main>
    );
}