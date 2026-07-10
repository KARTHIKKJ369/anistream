import type { AnimeSearchResult } from "@anistream/types";
import type { AnimeProvider } from "@anistream/types";

export interface CatalogProvider extends AnimeProvider {
  getTrending(): Promise<AnimeSearchResult[]>;
  getRecent(): Promise<AnimeSearchResult[]>;
  getPopular(): Promise<AnimeSearchResult[]>;
}

export function isCatalogProvider(provider: AnimeProvider): provider is CatalogProvider {
  return (
    "getTrending" in provider &&
    "getRecent" in provider &&
    "getPopular" in provider &&
    typeof provider.getTrending === "function" &&
    typeof provider.getRecent === "function" &&
    typeof provider.getPopular === "function"
  );
}
