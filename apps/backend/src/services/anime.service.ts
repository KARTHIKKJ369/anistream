import type {
  Anime,
  AnimeEpisode,
  AnimeSearchResult,
  ProviderName,
  StreamInfo,
} from "@anistream/types";

import { buildCacheKey } from "../cache/cache-keys.js";
import type { CacheClient } from "../cache/cache-client.interface.js";
import { ValidationError } from "../utils/app-error.js";
import type { ProviderRegistry } from "./provider-registry.service.js";

export class AnimeService {
  constructor(
    private readonly providerRegistry: ProviderRegistry,
    private readonly cache: CacheClient,
    private readonly cacheTtlSeconds: number,
  ) {}

  private resolveProvider(providerName?: string) {
    return this.providerRegistry.resolve(providerName);
  }

  private async getCached<T>(
    key: string,
    resolver: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.cache.get<T>(key);

    if (cached !== null) {
      return cached;
    }

    const value = await resolver();
    await this.cache.set(key, value, this.cacheTtlSeconds);
    return value;
  }

  async search(query: string, providerName?: string): Promise<AnimeSearchResult[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new ValidationError("Search query is required", "MISSING_QUERY");
    }

    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("search", provider.name, normalizedQuery.toLowerCase());

    return this.getCached(cacheKey, () => provider.search(normalizedQuery));
  }

  async getAnime(id: string, providerName?: string): Promise<Anime> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("anime", provider.name, id);

    return this.getCached(cacheKey, () => provider.getAnime(id));
  }

  async getEpisodes(id: string, providerName?: string): Promise<AnimeEpisode[]> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("episodes", provider.name, id);

    return this.getCached(cacheKey, () => provider.getEpisodes(id));
  }

  async getStream(
    id: string,
    episode: number,
    providerName?: string,
  ): Promise<StreamInfo> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("stream", provider.name, id, String(episode));

    return this.getCached(cacheKey, () => provider.getStream(id, episode));
  }

  async getTrending(providerName?: string): Promise<AnimeSearchResult[]> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("trending", provider.name);

    return this.getCached(cacheKey, () => provider.getTrending());
  }

  async getRecent(providerName?: string): Promise<AnimeSearchResult[]> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("recent", provider.name);

    return this.getCached(cacheKey, () => provider.getRecent());
  }

  async getPopular(providerName?: string): Promise<AnimeSearchResult[]> {
    const provider = this.resolveProvider(providerName);
    const cacheKey = buildCacheKey("popular", provider.name);

    return this.getCached(cacheKey, () => provider.getPopular());
  }

  listProviders(): ProviderName[] {
    return this.providerRegistry.list();
  }

  getDefaultProvider(): ProviderName {
    return this.providerRegistry.getDefaultName();
  }
}
