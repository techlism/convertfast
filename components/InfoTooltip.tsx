import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

export default function InfoTooltip({information}:{information : string}) {
    return (
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                <InfoIcon className="opacity-15 hover:opacity-80"/>
            </TooltipTrigger>
            <TooltipContent>
                <p>{information}</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}