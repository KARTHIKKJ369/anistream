import { EpisodeListSkeleton } from "@/components/skeletons/episode-list-skeleton";

export default function AnimeLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="h-80 w-56 shrink-0 animate-pulse rounded-xl bg-muted" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
      <EpisodeListSkeleton />
    </div>
  );
}
