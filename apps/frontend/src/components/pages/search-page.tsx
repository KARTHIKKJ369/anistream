"use client";

import { Suspense } from "react";

import { AnimeCard } from "@/components/anime/anime-card";
import { SearchBar } from "@/components/search/search-bar";
import { AnimeGridSkeleton } from "@/components/skeletons/anime-card-skeleton";
import { useSearchQuery } from "@/hooks/queries/use-anime-queries";
import { useSearchParams } from "next/navigation";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data, isLoading, isError, error } = useSearchQuery(query);

  if (!query.trim()) {
    return (
      <p className="text-muted-foreground">
        Enter a search term to find anime.
      </p>
    );
  }

  if (isLoading) {
    return <AnimeGridSkeleton count={8} />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground">
        No results found for &quot;{query}&quot;.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <p className="text-sm text-muted-foreground">
          Find anime across your configured provider.
        </p>
      </div>

      <Suspense fallback={null}>
        <SearchBar autoFocus />
      </Suspense>

      {query ? (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">
            Results for &quot;{query}&quot;
          </h2>
          <Suspense fallback={<AnimeGridSkeleton count={8} />}>
            <SearchResults />
          </Suspense>
        </div>
      ) : null}
    </div>
  );
}
