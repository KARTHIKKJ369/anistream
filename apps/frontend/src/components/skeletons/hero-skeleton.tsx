import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden rounded-2xl">
      <Skeleton className="absolute inset-0 rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 space-y-4 p-8">
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-4/5 max-w-lg" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
