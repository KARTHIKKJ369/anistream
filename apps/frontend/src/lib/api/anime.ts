import type {
  Anime,
  AnimeEpisode,
  AnimeSearchResult,
  ProviderName,
  StreamInfo,
} from "@anistream/types";

import { apiGet } from "./client";

interface ProvidersResponse {
  default: ProviderName;
  providers: ProviderName[];
}

function withProvider(provider?: ProviderName): Record<string, string | undefined> {
  return provider ? { provider } : {};
}

export const animeApi = {
  getProviders(): Promise<ProvidersResponse> {
    return apiGet<ProvidersResponse>("/providers");
  },

  search(query: string, provider?: ProviderName): Promise<AnimeSearchResult[]> {
    return apiGet<AnimeSearchResult[]>("/search", {
      params: { q: query, ...withProvider(provider) },
    });
  },

  getTrending(provider?: ProviderName): Promise<AnimeSearchResult[]> {
    return apiGet<AnimeSearchResult[]>("/trending", {
      params: withProvider(provider),
    });
  },

  getRecent(provider?: ProviderName): Promise<AnimeSearchResult[]> {
    return apiGet<AnimeSearchResult[]>("/recent", {
      params: withProvider(provider),
    });
  },

  getPopular(provider?: ProviderName): Promise<AnimeSearchResult[]> {
    return apiGet<AnimeSearchResult[]>("/popular", {
      params: withProvider(provider),
    });
  },

  getAnime(id: string, provider?: ProviderName): Promise<Anime> {
    return apiGet<Anime>(`/anime/${encodeURIComponent(id)}`, {
      params: withProvider(provider),
    });
  },

  getEpisodes(id: string, provider?: ProviderName): Promise<AnimeEpisode[]> {
    return apiGet<AnimeEpisode[]>(`/anime/${encodeURIComponent(id)}/episodes`, {
      params: withProvider(provider),
    });
  },

  getStream(
    id: string,
    episode: number,
    provider?: ProviderName,
  ): Promise<StreamInfo> {
    return apiGet<StreamInfo>(
      `/stream/${encodeURIComponent(id)}/${String(episode)}`,
      { params: withProvider(provider) },
    );
  },
};
