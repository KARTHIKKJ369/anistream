import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function encodeAnimeId(id: string): string {
  return encodeURIComponent(id);
}

export function decodeAnimeId(id: string): string {
  return decodeURIComponent(id);
}

export function formatDuration(seconds?: number): string {
  if (!seconds) {
    return "";
  }

  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
}

export function getPlaceholderImage(title: string, width = 300, height = 450): string {
  const text = encodeURIComponent(title.slice(0, 20));
  return `https://placehold.co/${width}x${height}/1a1a2e/e2e8f0?text=${text}`;
}
