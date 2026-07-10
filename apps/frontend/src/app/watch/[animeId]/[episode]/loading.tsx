import { Skeleton } from "@/components/ui/skeleton";

export default function WatchLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );
}
