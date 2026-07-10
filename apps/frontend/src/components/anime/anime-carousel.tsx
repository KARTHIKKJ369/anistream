"use client";

import type { AnimeSearchResult } from "@anistream/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { AnimeCard } from "@/components/anime/anime-card";
import { Button } from "@/components/ui/button";

interface AnimeCarouselProps {
  title: string;
  items: AnimeSearchResult[];
}

export function AnimeCarousel({ title, items }: AnimeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const amount = direction === "left" ? -400 : 400;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => scroll("left")} aria-label="Scroll left">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => scroll("right")} aria-label="Scroll right">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
        style={{ scrollbarWidth: "thin" }}
      >
        {items.map((anime, index) => (
          <AnimeCard key={anime.id} anime={anime} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
