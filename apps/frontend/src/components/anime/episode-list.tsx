"use client";

import type { AnimeEpisode } from "@anistream/types";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { formatDuration, encodeAnimeId, getPlaceholderImage } from "@/lib/utils";

interface EpisodeListProps {
  animeId: string;
  episodes: AnimeEpisode[];
}

function EpisodeCard({ animeId, episode }: { animeId: string; episode: AnimeEpisode }) {
  const [imageSrc, setImageSrc] = useState(
    episode.thumbnailUrl ?? getPlaceholderImage(`Ep ${String(episode.number)}`, 224, 112),
  );

  return (
    <Link
      href={`/watch/${encodeAnimeId(animeId)}/${String(episode.number)}`}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card/50 p-3 transition-all hover:border-primary/50 hover:bg-card hover:shadow-glow"
    >
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageSrc}
          alt={episode.title ?? `Episode ${String(episode.number)}`}
          fill
          sizes="112px"
          className="object-cover transition-transform group-hover:scale-105"
          onError={() => {
            setImageSrc(getPlaceholderImage(`Ep ${String(episode.number)}`, 224, 112));
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-6 w-6 fill-white text-white" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-primary">Episode {episode.number}</p>
        <p className="truncate font-medium">{episode.title ?? `Episode ${String(episode.number)}`}</p>
        {episode.duration ? (
          <p className="text-xs text-muted-foreground">{formatDuration(episode.duration)}</p>
        ) : null}
      </div>
    </Link>
  );
}

export function EpisodeList({ animeId, episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No episodes available.</p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} animeId={animeId} episode={episode} />
      ))}
    </div>
  );
}
