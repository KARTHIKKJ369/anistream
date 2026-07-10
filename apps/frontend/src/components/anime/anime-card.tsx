"use client";

import type { AnimeSearchResult } from "@anistream/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { encodeAnimeId, getPlaceholderImage } from "@/lib/utils";

interface AnimeCardProps {
  anime: AnimeSearchResult;
  priority?: boolean;
}

export function AnimeCard({ anime, priority = false }: AnimeCardProps) {
  const [imageSrc, setImageSrc] = useState(
    anime.imageUrl ?? getPlaceholderImage(anime.title),
  );

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group w-[160px] shrink-0 sm:w-[180px]"
    >
      <Link href={`/anime/${encodeAnimeId(anime.id)}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card-gradient shadow-card transition-shadow group-hover:shadow-glow">
          <Image
            src={imageSrc}
            alt={anime.title}
            fill
            sizes="(max-width: 640px) 160px, 180px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            onError={() => {
              setImageSrc(getPlaceholderImage(anime.title));
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {anime.status ? (
            <Badge
              variant="secondary"
              className="absolute right-2 top-2 bg-background/80 text-[10px] backdrop-blur-sm"
            >
              {anime.status}
            </Badge>
          ) : null}
        </div>
        <div className="mt-2 space-y-1">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">
            {anime.title}
          </h3>
          {anime.year ? (
            <p className="text-xs text-muted-foreground">{anime.year}</p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
