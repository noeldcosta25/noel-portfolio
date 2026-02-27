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
    const fetchData = async () => {
      try {
        const res = await fetch("/api/now-playing", {
          cache: "no-store", // prevent production caching
        });

        const json = await res.json();

        // Only update state if valid data exists
        if (json && json.title) {
          setData(json);
        }
      } catch (error) {
        // Do NOT reset state on error
        // Keep previous song visible
        console.error("NowPlaying fetch error:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s

    return () => clearInterval(interval);
  }, []);

  // If no valid data yet, show nothing
  if (!data || !data.title) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <SpotifyIcon className="w-8 h-8 shrink-0 opacity-90" />

      <span>
        {data.isPlaying ? "Listening to" : "Previously played"}
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
