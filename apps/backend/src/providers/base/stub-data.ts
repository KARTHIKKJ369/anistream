import type {
  Anime,
  AnimeEpisode,
  AnimeSearchResult,
  AnimeStatus,
  ProviderName,
  StreamInfo,
} from "@anistream/types";

interface StubAnimeTemplate {
  slug: string;
  title: string;
  description: string;
  status: AnimeStatus;
  genres: string[];
  year: number;
  rating: number;
  totalEpisodes: number;
}

const ANIME_TEMPLATES: StubAnimeTemplate[] = [
  {
    slug: "attack-on-titan",
    title: "Attack on Titan",
    description: "Humanity fights for survival against giant humanoid Titans.",
    status: "completed",
    genres: ["Action", "Drama", "Fantasy"],
    year: 2013,
    rating: 9.1,
    totalEpisodes: 87,
  },
  {
    slug: "demon-slayer",
    title: "Demon Slayer",
    description: "A boy joins the Demon Slayer Corps to save his sister.",
    status: "ongoing",
    genres: ["Action", "Supernatural"],
    year: 2019,
    rating: 8.7,
    totalEpisodes: 55,
  },
  {
    slug: "one-piece",
    title: "One Piece",
    description: "Monkey D. Luffy searches for the ultimate treasure.",
    status: "ongoing",
    genres: ["Action", "Adventure", "Comedy"],
    year: 1999,
    rating: 8.9,
    totalEpisodes: 1100,
  },
  {
    slug: "fullmetal-alchemist",
    title: "Fullmetal Alchemist: Brotherhood",
    description: "Two brothers seek the Philosopher's Stone to restore their bodies.",
    status: "completed",
    genres: ["Action", "Adventure", "Drama"],
    year: 2009,
    rating: 9.2,
    totalEpisodes: 64,
  },
  {
    slug: "spy-x-family",
    title: "Spy x Family",
    description: "A spy, assassin, and telepath form an unlikely family.",
    status: "ongoing",
    genres: ["Action", "Comedy", "Slice of Life"],
    year: 2022,
    rating: 8.6,
    totalEpisodes: 37,
  },
  {
    slug: "chainsaw-man",
    title: "Chainsaw Man",
    description: "Denji merges with his chainsaw devil pet to pay off his debts.",
    status: "ongoing",
    genres: ["Action", "Horror", "Supernatural"],
    year: 2022,
    rating: 8.5,
    totalEpisodes: 12,
  },
];

export function buildProviderAnimeId(provider: ProviderName, slug: string): string {
  return `${provider}:${slug}`;
}

export function parseProviderAnimeId(id: string): { provider: ProviderName; slug: string } | null {
  const separatorIndex = id.indexOf(":");

  if (separatorIndex <= 0) {
    return null;
  }

  const provider = id.slice(0, separatorIndex) as ProviderName;
  const slug = id.slice(separatorIndex + 1);

  if (!slug) {
    return null;
  }

  return { provider, slug };
}

export function createStubCatalog(provider: ProviderName): AnimeSearchResult[] {
  return ANIME_TEMPLATES.map((template) => ({
    id: buildProviderAnimeId(provider, template.slug),
    title: template.title,
    imageUrl: `https://cdn.anistream.local/posters/${template.slug}.jpg`,
    year: template.year,
    status: template.status,
  }));
}

export function createStubAnime(provider: ProviderName, slug: string): Anime | null {
  const template = ANIME_TEMPLATES.find((entry) => entry.slug === slug);

  if (!template) {
    return null;
  }

  return {
    id: buildProviderAnimeId(provider, template.slug),
    title: template.title,
    description: template.description,
    imageUrl: `https://cdn.anistream.local/posters/${template.slug}.jpg`,
    bannerUrl: `https://cdn.anistream.local/banners/${template.slug}.jpg`,
    status: template.status,
    genres: template.genres,
    year: template.year,
    rating: template.rating,
    totalEpisodes: template.totalEpisodes,
  };
}

export function createStubEpisodes(animeId: string, totalEpisodes: number): AnimeEpisode[] {
  const episodeCount = Math.min(totalEpisodes, 12);

  return Array.from({ length: episodeCount }, (_, index) => {
    const number = index + 1;

    return {
      id: `${animeId}:ep-${number}`,
      number,
      title: `Episode ${number}`,
      thumbnailUrl: `https://cdn.anistream.local/thumbnails/${animeId}/${number}.jpg`,
      duration: 1440,
    };
  });
}

export function createStubStream(animeId: string, episode: number): StreamInfo {
  return {
    animeId,
    episodeNumber: episode,
    sources: [
      {
        url: `https://cdn.anistream.local/hls/${animeId}/${episode}/master.m3u8`,
        isM3U8: true,
        qualities: [
          {
            label: "1080p",
            url: `https://cdn.anistream.local/hls/${animeId}/${episode}/1080p.m3u8`,
            bandwidth: 5_000_000,
          },
          {
            label: "720p",
            url: `https://cdn.anistream.local/hls/${animeId}/${episode}/720p.m3u8`,
            bandwidth: 2_800_000,
          },
        ],
        subtitles: [
          {
            label: "English",
            language: "en",
            url: `https://cdn.anistream.local/subs/${animeId}/${episode}/en.vtt`,
            default: true,
          },
        ],
      },
    ],
  };
}

export function filterSearchResults(
  catalog: AnimeSearchResult[],
  query: string,
): AnimeSearchResult[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return catalog;
  }

  return catalog.filter((item) => item.title.toLowerCase().includes(normalizedQuery));
}

export function getCatalogSections(catalog: AnimeSearchResult[]): {
  trending: AnimeSearchResult[];
  recent: AnimeSearchResult[];
  popular: AnimeSearchResult[];
} {
  return {
    trending: catalog.slice(0, 4),
    recent: [...catalog].reverse().slice(0, 4),
    popular: [...catalog].sort((left, right) => left.title.localeCompare(right.title)).slice(0, 4),
  };
}
