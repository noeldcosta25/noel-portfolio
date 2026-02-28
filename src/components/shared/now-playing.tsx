"use client";

import { useEffect, useState } from "react";
import { SpotifyIcon } from "@/components/shared/SpotifyIcon";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  spotifyUrl?: string;
};

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing", {
          cache: "no-store",
        });

        const json = await res.json();
        setData(json);
      } catch {
        // ignore errors silently
      }
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data || !data.title) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <SpotifyIcon className="w-8 h-8 shrink-0 opacity-90" />

      <span>
        {data.isPlaying ? "listening to" : "previously played"}
      </span>

      <a
        href={data.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-green-500 transition-colors"
      >
        {data.title}
      </a>
    </div>
  );
}
