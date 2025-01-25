import { MoveUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, FC } from "react";

export const CustomLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const isExternal = props.href?.startsWith('http');
  
  return (
    <a 
      {...props} 
      className={`inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors ${props.className || ''}`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {props.children}
      {isExternal && (
        <MoveUpRight className="ml-1 h-4 w-4" />
      )}
    </a>
  );
};