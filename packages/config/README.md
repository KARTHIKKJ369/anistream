# @anistream/config

Shared configuration presets for TypeScript and tooling across the monorepo.

## Purpose

Provides consistent compiler and tooling settings so every package follows the same standards.

## Responsibilities

- Export base TypeScript configurations for Node and React targets
- Keep compiler strictness aligned across apps and packages

## Dependencies

- None

## Usage

In a package `tsconfig.json`:

```json
{
  "extends": "@anistream/config/typescript/node",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

Available presets:

- `@anistream/config/typescript/base` — shared strict defaults
- `@anistream/config/typescript/node` — backend and Node packages
- `@anistream/config/typescript/react` — Next.js frontend
