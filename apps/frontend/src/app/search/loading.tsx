import { AnimeGridSkeleton } from "@/components/skeletons/anime-card-skeleton";

export default function SearchLoading() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-full max-w-xl animate-pulse rounded-md bg-muted" />
      <AnimeGridSkeleton count={8} />
    </div>
  );
}
