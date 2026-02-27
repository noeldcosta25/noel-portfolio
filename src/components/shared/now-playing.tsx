"use client";

import { useEffect, useState, useRef } from "react";
import { SpotifyIcon } from "@/components/shared/SpotifyIcon";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  spotifyUrl?: string;
};

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const lastTrackRef = useRef<NowPlayingData | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/now-playing", {
          cache: "no-store",
        });

        const json = await res.json();

        if (!json.title) return;

        // If we suddenly get an older track very quickly,
        // ignore it for 15 seconds (stability window)
        if (
          lastTrackRef.current &&
          json.title !== lastTrackRef.current.title &&
          Date.now() - lastUpdateRef.current < 15000
        ) {
          return;
        }

        lastTrackRef.current = json;
        lastUpdateRef.current = Date.now();
        setData(json);
      } catch {
        // ignore errors
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 8000);

    return () => clearInterval(interval);
  }, []);

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
