import cors from "cors";
import express, { type Express } from "express";

import { API_PREFIX } from "./config/constants.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { createApiRoutes } from "./routes/index.js";
import type { AnimeService } from "./services/anime.service.js";

export function createApp(animeService: AnimeService): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(API_PREFIX, createApiRoutes(animeService));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
