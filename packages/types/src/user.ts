export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  userId: string;
  preferredProvider?: string;
  autoplay: boolean;
  defaultQuality?: string;
  playbackSpeed: number;
  subtitleLanguage?: string;
}

export interface WatchProgress {
  id: string;
  userId: string;
  animeId: string;
  episodeNumber: number;
  positionSeconds: number;
  durationSeconds?: number;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  animeId: string;
  createdAt: string;
}

export interface SearchHistoryEntry {
  id: string;
  userId: string;
  query: string;
  searchedAt: string;
}
