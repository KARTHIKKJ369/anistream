import "dotenv/config";

import { createApp } from "./app.js";
import { createCacheClient } from "./cache/index.js";
import { loadConfig } from "./config/env.js";
import { AnimeService } from "./services/anime.service.js";
import { createProviderRegistry } from "./services/provider-registry.service.js";

async function startServer(): Promise<void> {
  const config = loadConfig();
  const cache = await createCacheClient(config);
  const providerRegistry = createProviderRegistry(config.defaultProvider);
  const animeService = new AnimeService(
    providerRegistry,
    cache,
    config.cacheTtlSeconds,
  );
  const app = createApp(animeService);

  app.listen(config.port, config.host, () => {
    console.log(
      `AniStream API listening on http://${config.host}:${config.port}/api`,
    );
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start AniStream API:", error);
  process.exit(1);
});
