import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { AnimeGridSkeleton } from "@/components/skeletons/anime-card-skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <HeroSkeleton />
      <AnimeGridSkeleton />
      <AnimeGridSkeleton />
    </div>
  );
}
