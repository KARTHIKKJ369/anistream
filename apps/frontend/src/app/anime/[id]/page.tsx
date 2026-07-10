import { AnimeDetailsPage } from "@/components/pages/anime-details-page";

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;
  return <AnimeDetailsPage animeId={id} />;
}
