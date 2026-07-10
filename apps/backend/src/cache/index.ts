import type { AppConfig } from "../config/env.js";
import type { CacheClient } from "./cache-client.interface.js";
import { MemoryCache } from "./memory-cache.js";
import { RedisCache } from "./redis-cache.js";

export async function createCacheClient(config: AppConfig): Promise<CacheClient> {
  if (!config.redisEnabled) {
    return new MemoryCache();
  }

  const redisCache = new RedisCache(config.redisUrl);
  await redisCache.connect();
  return redisCache;
}
