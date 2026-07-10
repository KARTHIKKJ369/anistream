"use client";

import type { StreamInfo } from "@anistream/types";
import Hls from "hls.js";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  stream: StreamInfo;
  title: string;
}

export function VideoPlayer({ stream, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  const source = stream.sources[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) {
      return;
    }

    setError(null);

    if (source.isM3U8 && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
      });

      hls.loadSource(source.url);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setError("Unable to load stream. The source may be unavailable.");
        }
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source.url;
      return;
    }

    video.src = source.url;
    video.onerror = () => {
      setError("Unable to load stream. The source may be unavailable.");
    };
  }, [source]);

  if (!source) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-muted">
        <p className="text-sm text-muted-foreground">No stream sources available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border bg-black shadow-card">
        <video
          ref={videoRef}
          controls
          playsInline
          className="aspect-video w-full"
          title={title}
        />
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground">
              Stub stream URLs are used in development. Real providers will serve playable HLS.
            </p>
          </div>
        ) : null}
      </div>

      {source.qualities && source.qualities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {source.qualities.map((quality) => (
            <span
              key={quality.label}
              className="rounded-md border border-border bg-muted/50 px-2 py-1 text-xs text-muted-foreground"
            >
              {quality.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
