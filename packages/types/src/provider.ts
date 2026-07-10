import type {
  Anime,
  AnimeEpisode,
  AnimeSearchResult,
  StreamInfo,
} from "./anime.js";

export type ProviderName =
  | "consumet"
  | "allanime"
  | "animepahe"
  | "hianime"
  | "gogoanime";

export interface AnimeProvider {
  readonly name: ProviderName;

  search(query: string): Promise<AnimeSearchResult[]>;

  getAnime(id: string): Promise<Anime>;

  getEpisodes(id: string): Promise<AnimeEpisode[]>;

  getStream(animeId: string, episode: number): Promise<StreamInfo>;
}
