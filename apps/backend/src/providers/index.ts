import type { ProviderName } from "@anistream/types";

import { AllanimeProvider } from "./allanime/allanime.provider.js";
import type { RegisteredProvider } from "./base/base-provider.js";
import { AnimepaheProvider } from "./animepahe/animepahe.provider.js";
import { ConsumetProvider } from "./consumet/consumet.provider.js";
import { GogoanimeProvider } from "./gogoanime/gogoanime.provider.js";
import { HianimeProvider } from "./hianime/hianime.provider.js";

export function createProviders(): RegisteredProvider[] {
  return [
    new ConsumetProvider(),
    new AllanimeProvider(),
    new AnimepaheProvider(),
    new HianimeProvider(),
    new GogoanimeProvider(),
  ];
}

export function isProviderName(value: string): value is ProviderName {
  return ["consumet", "allanime", "animepahe", "hianime", "gogoanime"].includes(value);
}

export { BaseAnimeProvider } from "./base/base-provider.js";
export { ConsumetProvider } from "./consumet/consumet.provider.js";
export { AllanimeProvider } from "./allanime/allanime.provider.js";
export { AnimepaheProvider } from "./animepahe/animepahe.provider.js";
export { HianimeProvider } from "./hianime/hianime.provider.js";
export { GogoanimeProvider } from "./gogoanime/gogoanime.provider.js";
