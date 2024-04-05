import HomePageHeroSection from "@/components/HomePageHeroSection"
import Image from "next/image"
export default function Page(){
  return (
    <main className="flex justify-center align-middle  items-center m-4">
      {/* <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome from Home</h1>
        <Image src={'/video-conversion-formats.svg'} alt="List of Video Conversion Formats" height={700} width={700} className="dark:inverted"/>
      </div> */}
      <HomePageHeroSection/>
    </main>
  )
}