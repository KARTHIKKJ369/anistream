import { WatchPage } from "@/components/pages/watch-page";

interface WatchPageProps {
  params: Promise<{ animeId: string; episode: string }>;
}

export default async function Watch({ params }: WatchPageProps) {
  const { animeId, episode } = await params;
  return <WatchPage animeId={animeId} episode={Number.parseInt(episode, 10)} />;
}
