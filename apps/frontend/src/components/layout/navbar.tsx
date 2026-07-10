"use client";

import type { ProviderName } from "@anistream/types";
import { Menu, Play, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { SearchBar } from "@/components/search/search-bar";
import { Button } from "@/components/ui/button";
import { useProvidersQuery } from "@/hooks/queries/use-anime-queries";
import { useUiStore } from "@/stores/ui-store";

const PROVIDER_LABELS: Record<ProviderName, string> = {
  consumet: "Consumet",
  allanime: "AllAnime",
  animepahe: "AnimePahe",
  hianime: "HiAnime",
  gogoanime: "GogoAnime",
};

export function Navbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const provider = useUiStore((state) => state.provider);
  const setProvider = useUiStore((state) => state.setProvider);
  const { data: providersData } = useProvidersQuery();

  const providers = providersData?.providers ?? [];

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Play className="h-4 w-4 fill-current text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            Ani<span className="text-primary">Stream</span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/search" className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value as ProviderName)}
            className="h-9 rounded-md border border-border bg-muted/50 px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:text-sm"
            aria-label="Select provider"
          >
            {providers.map((name) => (
              <option key={name} value={name}>
                {PROVIDER_LABELS[name]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
