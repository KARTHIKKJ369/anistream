import { Suspense } from "react";

import { SearchPage } from "@/components/pages/search-page";
import { AnimeGridSkeleton } from "@/components/skeletons/anime-card-skeleton";

export default function Search() {
  return (
    <Suspense fallback={<AnimeGridSkeleton count={8} />}>
      <SearchPage />
    </Suspense>
  );
}
