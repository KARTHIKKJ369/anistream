# @anistream/types

Shared TypeScript type definitions used across the AniStream monorepo.

## Purpose

Centralizes domain models, API contracts, and the provider interface so frontend and backend stay in sync without coupling to implementation details.

## Responsibilities

- Define anime, episode, and stream data structures
- Define the `AnimeProvider` interface for source adapters
- Define API response shapes and user-related models

## Dependencies

- None (types only)

## Usage

```typescript
import type { Anime, AnimeProvider } from "@anistream/types";
```

Build before consuming from other packages:

```bash
pnpm --filter @anistream/types build
```
