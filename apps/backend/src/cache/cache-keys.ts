import { CACHE_NAMESPACES } from "../config/constants.js";

export function buildCacheKey(
  namespace: (typeof CACHE_NAMESPACES)[keyof typeof CACHE_NAMESPACES],
  provider: string,
  ...parts: string[]
): string {
  const suffix = parts.length > 0 ? `:${parts.join(":")}` : "";
  return `anistream:${namespace}:${provider}${suffix}`;
}
