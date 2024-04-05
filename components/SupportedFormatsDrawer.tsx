import * as React from "react"


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { conversions } from "@/lib/conversion-formats" ;
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">See Supported Formats</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full lg:max-w-[50vw] max-w-[100vw] xl:max-w-[30vw]">
          <DrawerHeader>
            <DrawerTitle>Choose Conversion Formats</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
            <ScrollArea className="h-[45vh]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 items-center">
                    {
                        conversions.map((conversion, index) => {
                            return (                 
                                <Link className="font-medium hover:underline border p-2 rounded-lg text-sm m-1" href={`/${conversion.from.toLowerCase()}-to-${conversion.to.toLowerCase()}`}>Convert {conversion.from} to {conversion.to}</Link>
                            )
                        })
                    }
                </div>

            </ScrollArea>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
