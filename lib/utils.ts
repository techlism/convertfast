import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// utils/posts.ts

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}