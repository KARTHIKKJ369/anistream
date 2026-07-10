import type { ApiErrorResponse, ApiSuccessResponse } from "@anistream/types";

import { API_BASE_URL } from "../constants";

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

interface RequestOptions {
  params?: Record<string, string | undefined>;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiSuccessResponse<T> | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const error = payload.success
      ? { code: "HTTP_ERROR", message: response.statusText }
      : payload.error;

    throw new ApiClientError(error.code, error.message, response.status);
  }

  return payload.data;
}

export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return parseResponse<T>(response);
}
