import { Router } from "express";

import { API_PREFIX } from "../config/constants.js";
import type { AnimeService } from "../services/anime.service.js";
import { createAnimeRoutes } from "./anime.routes.js";

export function createApiRoutes(animeService: AnimeService): Router {
  const router = Router();

  router.get("/health", (_request, response) => {
    response.json({ success: true, data: { status: "ok" } });
  });

  router.use(createAnimeRoutes(animeService));

  return router;
}

export { API_PREFIX };
