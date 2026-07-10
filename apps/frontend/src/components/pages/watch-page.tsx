"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { VideoPlayer } from "@/components/player/video-player";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAnimeQuery,
  useEpisodesQuery,
  useStreamQuery,
} from "@/hooks/queries/use-anime-queries";
import { decodeAnimeId, encodeAnimeId } from "@/lib/utils";

interface WatchPageProps {
  animeId: string;
  episode: number;
}

export function WatchPage({ animeId, episode }: WatchPageProps) {
  const decodedId = decodeAnimeId(animeId);
  const animeQuery = useAnimeQuery(decodedId);
  const episodesQuery = useEpisodesQuery(decodedId);
  const streamQuery = useStreamQuery(decodedId, episode);

  const episodes = episodesQuery.data ?? [];
  const currentIndex = episodes.findIndex((item) => item.number === episode);
  const previousEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : undefined;
  const nextEpisode =
    currentIndex >= 0 && currentIndex < episodes.length - 1
      ? episodes[currentIndex + 1]
      : undefined;

  if (animeQuery.isLoading || streamQuery.isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }

  if (animeQuery.isError || streamQuery.isError || !animeQuery.data || !streamQuery.data) {
    return (
      <div className="mx-auto max-w-5xl rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
        <p className="text-destructive">
          {streamQuery.error?.message ?? animeQuery.error?.message ?? "Unable to load stream."}
        </p>
        <Button asChild variant="secondary" className="mt-4">
          <Link href={`/anime/${encodeAnimeId(decodedId)}`}>Back to Anime</Link>
        </Button>
      </div>
    );
  }

  const anime = animeQuery.data;
  const episodeTitle =
    episodes.find((item) => item.number === episode)?.title ?? `Episode ${String(episode)}`;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <VideoPlayer
        stream={streamQuery.data}
        title={`${anime.title} - ${episodeTitle}`}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-primary">Episode {episode}</p>
          <h1 className="text-2xl font-bold">{anime.title}</h1>
          <p className="text-muted-foreground">{episodeTitle}</p>
        </div>

        <div className="flex gap-2">
          {previousEpisode ? (
            <Button asChild variant="outline" className="gap-1">
              <Link href={`/watch/${encodeAnimeId(decodedId)}/${String(previousEpisode.number)}`}>
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Link>
            </Button>
          ) : null}
          {nextEpisode ? (
            <Button asChild className="gap-1">
              <Link href={`/watch/${encodeAnimeId(decodedId)}/${String(nextEpisode.number)}`}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
