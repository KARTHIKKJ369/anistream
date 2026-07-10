import type { ApiErrorResponse, ApiSuccessResponse } from "@anistream/types";

export function createApiSuccess<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function createApiError(code: string, message: string): ApiErrorResponse {
  return {
    success: false,
    error: { code, message },
  };
}
