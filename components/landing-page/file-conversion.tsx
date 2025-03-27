"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileDown, ImageIcon } from "lucide-react"
import type { Conversion } from "@/lib/conversion-formats"
import { Label } from "@/components/ui/label"

export function FileConversion({ conversions }: { conversions: Conversion[] }) {
  const [activeTab, setActiveTab] = useState<Conversion['type'] | 'all'>('all')
  const [fromFormat, setFromFormat] = useState("")
  const [toFormat, setToFormat] = useState("")

  // Get unique categories and format mappings
  const categories = Array.from(new Set(conversions.map(c => c.type)))
  const formatTypeMap = new Map(
    conversions.map(c => [c.from.toLowerCase(), c.type])
  )

  // Get filtered formats based on active tab
  const getFilteredFormats = () => {
    if (activeTab === 'all') return Array.from(new Set(conversions.map(c => c.from.toLowerCase())))
    return Array.from(new Set(
      conversions
        .filter(c => c.type === activeTab)
        .map(c => c.from.toLowerCase())
    ))
  }

  // Get available conversion targets
  const getToFormats = () => {
    if (!fromFormat) return []
    const fromType = formatTypeMap.get(fromFormat)
    return conversions
      .filter(c => 
        c.from.toLowerCase() === fromFormat &&
        (activeTab === 'all' || c.type === activeTab)
      )
      .map(c => c.to.toLowerCase())
  }

  const getConversionUrl = () => {
    if (fromFormat && toFormat) return `/${fromFormat}-to-${toFormat}`
    return '#'
  }

  return (
    <div className="mx-auto max-w-3xl" id="homepage_converter">
      <h2 className="text-3xl font-bold text-center mb-8">Try it now</h2>

      <Card className="bg-background overflow-hidden shadow-xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as "image" | "audio" | "video" | "document" | "all")}>
            <TabsList className="w-full grid grid-cols-1 md:grid-cols-5 h-full my-4">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-8 md:grid-cols-[1fr,auto,1fr] items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">From</Label>
              <Select 
                value={fromFormat} 
                onValueChange={v => {
                  setFromFormat(v)
                  setToFormat("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredFormats().map(format => (
                    <SelectItem key={format} value={format}>
                      {format.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end justify-center pb-2">
              <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">To</Label>
              <Select 
                value={toFormat} 
                onValueChange={setToFormat} 
                disabled={!fromFormat}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {getToFormats().map(format => (
                    <SelectItem key={format} value={format}>
                      {format.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Link href={getConversionUrl()} passHref>
              <Button
                className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                disabled={!fromFormat || !toFormat}
              >
                Convert Now
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link href="/compress-images" passHref>
              <Button  className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" />
                Compress Images
              </Button>
            </Link>
            <Link href="/remove-bg" passHref>
              <Button  className="w-full">
                <FileDown className="mr-2 h-4 w-4" />
                Remove Background
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}