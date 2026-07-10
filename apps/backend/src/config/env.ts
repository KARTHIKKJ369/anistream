import type { ProviderName } from "@anistream/types";

const DEFAULT_PROVIDER: ProviderName = "consumet";
const VALID_PROVIDERS: ProviderName[] = [
  "consumet",
  "allanime",
  "animepahe",
  "hianime",
  "gogoanime",
];

function readProvider(value: string | undefined): ProviderName {
  if (value && VALID_PROVIDERS.includes(value as ProviderName)) {
    return value as ProviderName;
  }

  return DEFAULT_PROVIDER;
}

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value === "true" || value === "1";
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  host: string;
  defaultProvider: ProviderName;
  redisEnabled: boolean;
  redisUrl: string;
  cacheTtlSeconds: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    nodeEnv: env.NODE_ENV ?? "development",
    port: readNumber(env.PORT, 4000),
    host: env.HOST ?? "0.0.0.0",
    defaultProvider: readProvider(env.DEFAULT_PROVIDER),
    redisEnabled: readBoolean(env.REDIS_ENABLED, false),
    redisUrl: env.REDIS_URL ?? "redis://localhost:6379",
    cacheTtlSeconds: readNumber(env.CACHE_TTL_SECONDS, 300),
  };
}
