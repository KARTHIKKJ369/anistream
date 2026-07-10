# @anistream/frontend

Next.js 15 web application for AniStream.

## Purpose

Provides the Netflix/Jellyfin-inspired UI for browsing, searching, and watching anime.

## Responsibilities

- Page routing and layout (Home, Search, Anime Details, Watch)
- Reusable UI components (Navbar, Sidebar, AnimeCard, EpisodeList)
- Client state via Zustand (sidebar, provider selection)
- Server data via TanStack Query connected to the backend API
- Video playback via hls.js

## Dependencies

- `@anistream/types` — shared type definitions
- Backend API at `NEXT_PUBLIC_API_URL` (default: `http://localhost:4000/api`)

## Usage

```bash
# Copy env and start dev server
cp .env.example .env.local
pnpm --filter @anistream/frontend dev
```

Ensure the backend is running:

```bash
pnpm --filter @anistream/backend dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero banner and carousels |
| `/search?q=` | Search results |
| `/anime/[id]` | Anime details and episode list |
| `/watch/[animeId]/[episode]` | Video player |
