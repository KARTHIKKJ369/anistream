"use client";

import type { Anime } from "@anistream/types";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { encodeAnimeId, getPlaceholderImage } from "@/lib/utils";

interface HeroBannerProps {
  anime: Anime;
}

export function HeroBanner({ anime }: HeroBannerProps) {
  const [imageSrc, setImageSrc] = useState(
    anime.bannerUrl ?? anime.imageUrl ?? getPlaceholderImage(anime.title, 1200, 600),
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[50vh] min-h-[320px] w-full overflow-hidden rounded-2xl"
    >
      <Image
        src={imageSrc}
        alt={anime.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
        onError={() => {
          setImageSrc(getPlaceholderImage(anime.title, 1200, 600));
        }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <div className="max-w-2xl space-y-4">
          <div className="flex flex-wrap gap-2">
            {anime.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" className="bg-background/40 backdrop-blur-sm">
                {genre}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{anime.title}</h1>
          {anime.description ? (
            <p className="line-clamp-3 text-sm text-muted-foreground sm:text-base">
              {anime.description}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="gap-2 shadow-glow">
              <Link href={`/watch/${encodeAnimeId(anime.id)}/1`}>
                <Play className="h-4 w-4 fill-current" />
                Watch Now
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/anime/${encodeAnimeId(anime.id)}`}>More Info</Link>
            </Button>
            {anime.rating ? (
              <span className="text-sm text-muted-foreground">
                Rating: <span className="font-medium text-foreground">{anime.rating}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
