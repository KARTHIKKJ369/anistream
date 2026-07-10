# AniStream

Self-hosted anime streaming platform inspired by Jellyfin, Netflix, and ani-cli.

Browse, search, and stream anime through a modern web interface — provider-agnostic, extensible, and built for homelab deployment.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | Next.js 15, React 19, TailwindCSS   |
| Backend  | Node.js, Express, TypeScript        |
| Database | Prisma + SQLite                     |
| Cache    | Redis                               |
| Video    | hls.js                              |
| Deploy   | Docker Compose                      |

## Monorepo Structure

```
anistream/
├── apps/
│   ├── frontend/     # Next.js web app
│   └── backend/      # Express API server
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── shared/       # Shared utilities
│   └── config/       # Shared TS/ESLint presets
├── docker/           # Docker Compose & Dockerfiles
└── docs/             # Documentation
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
pnpm build
pnpm test
```

## Development

This project is built incrementally. Each step adds a focused slice of functionality with tests and documentation.

### Current Status — Step 1 Complete

- Monorepo scaffolding with pnpm workspaces
- Shared TypeScript types including `AnimeProvider` interface
- Shared utilities package with Vitest
- ESLint + Prettier + strict TypeScript configuration
- Placeholder app packages for frontend and backend

## License

Private — homelab use.
