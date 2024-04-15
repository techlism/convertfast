"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

import { Button } from "./ui/button"

const DarkModeSwitch = () =>{  
  const { theme, setTheme } = useTheme();
  const changeTheme = () =>{
    setTimeout(() => {
      if(theme === 'light') setTheme('dark');
      else if(theme === 'dark') setTheme('light');
    }, 150);
  
  }

  return(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>    
        <Button variant={'outline'} size="default" onClick={changeTheme} className="transition-colors duration-200 bg-transparent border-0 mr-1">
          { theme==='light' ? 
            <Moon size={20} />
            :
            <Sun size={20} />
          }
        </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {theme==='dark' ? 'Light' : 'Dark'} mode</p>
        </TooltipContent>
        </Tooltip>
        </TooltipProvider>   
  )
}
export default DarkModeSwitch;