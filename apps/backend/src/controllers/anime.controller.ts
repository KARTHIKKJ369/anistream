import type { NextFunction, Request, Response } from "express";
import { createApiSuccess } from "@anistream/shared";

import type { AnimeService } from "../services/anime.service.js";
import { ValidationError } from "../utils/app-error.js";

function readProviderQuery(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }

  return value.trim();
}

function readEpisodeParam(value: string): number {
  const episode = Number.parseInt(value, 10);

  if (!Number.isFinite(episode) || episode < 1) {
    throw new ValidationError("Episode must be a positive integer", "INVALID_EPISODE");
  }

  return episode;
}

export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  search = async (request: Request, response: Response): Promise<void> => {
    const query = typeof request.query.q === "string" ? request.query.q : "";
    const provider = readProviderQuery(request.query.provider);
    const results = await this.animeService.search(query, provider);

    response.json(createApiSuccess(results));
  };

  getAnime = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const anime = await this.animeService.getAnime(request.params.id, provider);

    response.json(createApiSuccess(anime));
  };

  getEpisodes = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const episodes = await this.animeService.getEpisodes(request.params.id, provider);

    response.json(createApiSuccess(episodes));
  };

  getStream = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const episode = readEpisodeParam(request.params.episode);
    const stream = await this.animeService.getStream(request.params.id, episode, provider);

    response.json(createApiSuccess(stream));
  };

  getTrending = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const items = await this.animeService.getTrending(provider);

    response.json(createApiSuccess(items));
  };

  getRecent = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const items = await this.animeService.getRecent(provider);

    response.json(createApiSuccess(items));
  };

  getPopular = async (request: Request, response: Response): Promise<void> => {
    const provider = readProviderQuery(request.query.provider);
    const items = await this.animeService.getPopular(provider);

    response.json(createApiSuccess(items));
  };

  getProviders = async (_request: Request, response: Response): Promise<void> => {
    response.json(
      createApiSuccess({
        default: this.animeService.getDefaultProvider(),
        providers: this.animeService.listProviders(),
      }),
    );
  };
}

export function createAnimeController(animeService: AnimeService): AnimeController {
  return new AnimeController(animeService);
}

export type RouteHandler = (request: Request, response: Response, next: NextFunction) => void;

export function bindController(handler: (request: Request, response: Response) => Promise<void>): RouteHandler {
  return (request, response, next) => {
    void handler(request, response).catch(next);
  };
}
