"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";

import { EpisodeList } from "@/components/anime/episode-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EpisodeListSkeleton } from "@/components/skeletons/episode-list-skeleton";
import { useAnimeQuery, useEpisodesQuery } from "@/hooks/queries/use-anime-queries";
import { decodeAnimeId, encodeAnimeId, getPlaceholderImage } from "@/lib/utils";

interface AnimeDetailsPageProps {
  animeId: string;
}

export function AnimeDetailsPage({ animeId }: AnimeDetailsPageProps) {
  const decodedId = decodeAnimeId(animeId);
  const animeQuery = useAnimeQuery(decodedId);
  const episodesQuery = useEpisodesQuery(decodedId);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  if (animeQuery.isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="h-80 w-56 shrink-0 animate-pulse rounded-xl bg-muted" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>
        </div>
        <EpisodeListSkeleton />
      </div>
    );
  }

  if (animeQuery.isError || !animeQuery.data) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
        <p className="text-destructive">
          {animeQuery.error?.message ?? "Anime not found."}
        </p>
        <Button asChild variant="secondary" className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const anime = animeQuery.data;
  const posterSrc = imageSrc ?? anime.imageUrl ?? getPlaceholderImage(anime.title);

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-8 md:flex-row">
        <div className="relative mx-auto h-80 w-56 shrink-0 overflow-hidden rounded-xl shadow-card md:mx-0">
          <Image
            src={posterSrc}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="224px"
            priority
            onError={() => {
              setImageSrc(getPlaceholderImage(anime.title));
            }}
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{anime.status}</Badge>
            {anime.year ? <Badge variant="outline">{anime.year}</Badge> : null}
            {anime.rating ? (
              <Badge variant="secondary">★ {anime.rating}</Badge>
            ) : null}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{anime.title}</h1>

          {anime.description ? (
            <p className="max-w-2xl text-muted-foreground">{anime.description}</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/watch/${encodeAnimeId(anime.id)}/1`}>
                <Play className="h-4 w-4 fill-current" />
                Play Episode 1
              </Link>
            </Button>
            {anime.totalEpisodes ? (
              <span className="flex items-center text-sm text-muted-foreground">
                {anime.totalEpisodes} episodes
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Episodes</h2>
        {episodesQuery.isLoading ? (
          <EpisodeListSkeleton />
        ) : episodesQuery.data ? (
          <EpisodeList animeId={anime.id} episodes={episodesQuery.data} />
        ) : (
          <p className="text-sm text-muted-foreground">Failed to load episodes.</p>
        )}
      </section>
    </div>
  );
}
