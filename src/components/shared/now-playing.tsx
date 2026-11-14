"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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

        if (!res.ok) throw new Error("Listening history unavailable");
        const json = await res.json();
        setData(json);
      } catch {
        setData((previous) => previous ?? { isPlaying: false });
      }
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-border/60 bg-background/80 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.025)]" aria-label="Spotify listening activity">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
        <SpotifyIcon className="size-7" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground">
          {data?.isPlaying && <span className="size-1.5 rounded-full bg-green-600" aria-hidden="true" />}
          {data?.title ? (data.isPlaying ? "Listening now · Spotify" : "Recently played · Spotify") : "Spotify"}
        </p>
        {data?.title ? (
          <>
            <a
              href={data.spotifyUrl ?? `https://open.spotify.com/search/${encodeURIComponent(`${data.artist ?? ""} ${data.title}`.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
              aria-label={`${data.title}${data.artist ? ` by ${data.artist}` : ""} on Spotify (opens in a new tab)`}
            >
              <span className="truncate">{data.title}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
            </a>
            {data.artist && <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">{data.artist}</p>}
          </>
        ) : (
          <p className="text-xs font-medium text-muted-foreground">{data ? "Listening history unavailable" : "Loading listening activity…"}</p>
        )}
      </div>
    </div>
  );
}
