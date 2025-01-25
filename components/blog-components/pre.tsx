'use client'
import type React from 'react';
import { useState, useRef } from 'react';
import { Check, Copy, FileIcon } from 'lucide-react';

interface PreWithCopyProps extends React.HTMLAttributes<HTMLPreElement> {
  title?: string;
}

export const PreWithCopy: React.FC<PreWithCopyProps> = ({ 
  children, 
  title, 
  className = '', 
  ...props 
}) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyCode = async () => {
    try {
      // Access the DOM node directly to find the code element
      const codeElement = preRef.current?.querySelector('code');
      const textToCopy = codeElement?.textContent?.trim() || '';
      
      await navigator.clipboard.writeText(textToCopy);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Copy failed', err);
      setCopied(false);
    }
  };

  return (
    <div className="relative my-6 group">
      <div className="absolute top-2 right-2 z-10">
        <button
          className="p-2 rounded-md transition-colors hover:border-border"
          onClick={copyCode}
          disabled={copied}
          aria-label="Copy code"
          type="button"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      
      <div className="border rounded-lg overflow-hidden shadow-sm">
        {title && (
          <div className="p-3 border-b text-base font-medium flex gap-2 items-center">
            <FileIcon className='h-4'/>
            {title}
          </div>
        )}
        <pre 
          ref={preRef}
          {...props}
          className={`p-3 overflow-x-auto font-medium text-pretty text-sm dark:bg-neutral-900/85 bg-neutral-50/30 [&>code]:bg-transparent ${className}`}
        >
          {children}
        </pre>
      </div>
    </div>
  );
};