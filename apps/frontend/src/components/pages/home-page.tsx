"use client";

import { AnimeCarousel } from "@/components/anime/anime-carousel";
import { HeroBanner } from "@/components/anime/hero-banner";
import { AnimeGridSkeleton } from "@/components/skeletons/anime-card-skeleton";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import {
  useAnimeQuery,
  usePopularQuery,
  useRecentQuery,
  useTrendingQuery,
} from "@/hooks/queries/use-anime-queries";

export function HomePage() {
  const trending = useTrendingQuery();
  const recent = useRecentQuery();
  const popular = usePopularQuery();

  const featuredId = trending.data?.[0]?.id ?? "";
  const featuredAnime = useAnimeQuery(featuredId);
  const isHeroLoading = trending.isLoading || featuredAnime.isLoading;

  return (
    <div className="space-y-10">
      {isHeroLoading ? (
        <HeroSkeleton />
      ) : featuredAnime.data ? (
        <HeroBanner anime={featuredAnime.data} />
      ) : null}

      {trending.isLoading ? (
        <AnimeGridSkeleton />
      ) : trending.data ? (
        <AnimeCarousel title="Trending Now" items={trending.data} />
      ) : null}

      {recent.isLoading ? (
        <AnimeGridSkeleton />
      ) : recent.data ? (
        <AnimeCarousel title="Recently Added" items={recent.data} />
      ) : null}

      {popular.isLoading ? (
        <AnimeGridSkeleton />
      ) : popular.data ? (
        <AnimeCarousel title="Popular" items={popular.data} />
      ) : null}

      {trending.isError || recent.isError || popular.isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Failed to load content. Make sure the backend is running at{" "}
          <code className="rounded bg-muted px-1">localhost:4000</code>.
        </div>
      ) : null}
    </div>
  );
}
