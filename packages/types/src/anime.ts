export type AnimeStatus = "ongoing" | "completed" | "upcoming" | "unknown";

export interface Anime {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  bannerUrl?: string;
  status: AnimeStatus;
  genres: string[];
  year?: number;
  rating?: number;
  totalEpisodes?: number;
}

export interface AnimeSearchResult {
  id: string;
  title: string;
  imageUrl?: string;
  year?: number;
  status?: AnimeStatus;
}

export interface AnimeEpisode {
  id: string;
  number: number;
  title?: string;
  thumbnailUrl?: string;
  duration?: number;
  airedAt?: string;
}

export interface StreamQuality {
  label: string;
  url: string;
  bandwidth?: number;
}

export interface SubtitleTrack {
  label: string;
  language: string;
  url: string;
  default?: boolean;
}

export interface StreamSource {
  url: string;
  isM3U8: boolean;
  qualities?: StreamQuality[];
  subtitles?: SubtitleTrack[];
  referer?: string;
}

export interface StreamInfo {
  animeId: string;
  episodeNumber: number;
  sources: StreamSource[];
}
