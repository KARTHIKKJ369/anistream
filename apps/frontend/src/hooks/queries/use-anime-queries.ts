"use client";

import { useQuery } from "@tanstack/react-query";

import { animeApi } from "@/lib/api/anime";
import { useUiStore } from "@/stores/ui-store";

export function useProvidersQuery() {
  return useQuery({
    queryKey: ["providers"],
    queryFn: () => animeApi.getProviders(),
  });
}

export function useTrendingQuery() {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["trending", provider],
    queryFn: () => animeApi.getTrending(provider),
  });
}

export function useRecentQuery() {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["recent", provider],
    queryFn: () => animeApi.getRecent(provider),
  });
}

export function usePopularQuery() {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["popular", provider],
    queryFn: () => animeApi.getPopular(provider),
  });
}

export function useSearchQuery(query: string) {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["search", query, provider],
    queryFn: () => animeApi.search(query, provider),
    enabled: query.trim().length > 0,
  });
}

export function useAnimeQuery(id: string) {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["anime", id, provider],
    queryFn: () => animeApi.getAnime(id, provider),
    enabled: id.length > 0,
  });
}

export function useEpisodesQuery(id: string) {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["episodes", id, provider],
    queryFn: () => animeApi.getEpisodes(id, provider),
    enabled: id.length > 0,
  });
}

export function useStreamQuery(animeId: string, episode: number) {
  const provider = useUiStore((state) => state.provider);

  return useQuery({
    queryKey: ["stream", animeId, episode, provider],
    queryFn: () => animeApi.getStream(animeId, episode, provider),
    enabled: animeId.length > 0 && episode > 0,
  });
}
