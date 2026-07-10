import { Router } from "express";

import { bindController, createAnimeController } from "../controllers/anime.controller.js";
import type { AnimeService } from "../services/anime.service.js";

export function createAnimeRoutes(animeService: AnimeService): Router {
  const router = Router();
  const controller = createAnimeController(animeService);

  router.get("/search", bindController(controller.search));
  router.get("/providers", bindController(controller.getProviders));
  router.get("/trending", bindController(controller.getTrending));
  router.get("/recent", bindController(controller.getRecent));
  router.get("/popular", bindController(controller.getPopular));
  router.get("/anime/:id", bindController(controller.getAnime));
  router.get("/anime/:id/episodes", bindController(controller.getEpisodes));
  router.get("/stream/:id/:episode", bindController(controller.getStream));

  return router;
}
