import type {
  Anime,
  AnimeEpisode,
  AnimeProvider,
  AnimeSearchResult,
  ProviderName,
  StreamInfo,
} from "@anistream/types";

import type { CatalogProvider } from "../../types/catalog-provider.js";
import { NotFoundError } from "../../utils/app-error.js";
import {
  createStubAnime,
  createStubCatalog,
  createStubEpisodes,
  createStubStream,
  filterSearchResults,
  getCatalogSections,
  parseProviderAnimeId,
} from "./stub-data.js";

export abstract class BaseAnimeProvider implements CatalogProvider {
  abstract readonly name: ProviderName;

  protected get catalog(): AnimeSearchResult[] {
    return createStubCatalog(this.name);
  }

  async search(query: string): Promise<AnimeSearchResult[]> {
    return filterSearchResults(this.catalog, query);
  }

  async getAnime(id: string): Promise<Anime> {
    const parsed = parseProviderAnimeId(id);
    const slug = parsed?.slug ?? id.replace(`${this.name}:`, "");
    const anime = createStubAnime(this.name, slug);

    if (!anime) {
      throw new NotFoundError(`Anime not found: ${id}`, "ANIME_NOT_FOUND");
    }

    return anime;
  }

  async getEpisodes(id: string): Promise<AnimeEpisode[]> {
    const anime = await this.getAnime(id);
    const totalEpisodes = anime.totalEpisodes ?? 12;

    return createStubEpisodes(anime.id, totalEpisodes);
  }

  async getStream(animeId: string, episode: number): Promise<StreamInfo> {
    if (episode < 1) {
      throw new NotFoundError(`Invalid episode number: ${episode}`, "EPISODE_NOT_FOUND");
    }

    await this.getAnime(animeId);
    return createStubStream(animeId, episode);
  }

  async getTrending(): Promise<AnimeSearchResult[]> {
    return getCatalogSections(this.catalog).trending;
  }

  async getRecent(): Promise<AnimeSearchResult[]> {
    return getCatalogSections(this.catalog).recent;
  }

  async getPopular(): Promise<AnimeSearchResult[]> {
    return getCatalogSections(this.catalog).popular;
  }
}

export type RegisteredProvider = AnimeProvider & CatalogProvider;
