# @anistream/shared

Cross-cutting utilities shared by frontend and backend.

## Purpose

Holds reusable, provider-agnostic helper functions that do not belong in a specific app.

## Responsibilities

- API response helpers
- String and formatting utilities
- Other shared logic with no UI or I/O dependencies

## Dependencies

- `@anistream/types` — type definitions for API helpers

## Usage

```typescript
import { createApiSuccess, slugify } from "@anistream/shared";
```

Run tests:

```bash
pnpm --filter @anistream/shared test
```
