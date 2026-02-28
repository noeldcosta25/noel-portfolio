import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const USERNAME = "noeldcosta";
const API_KEY = process.env.LASTFM_API_KEY!;

export async function GET() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=2`,
      { cache: "no-store" }
    );

    const data = await res.json();
    const tracks = data?.recenttracks?.track;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const list = Array.isArray(tracks) ? tracks : [tracks];
    const current = list[0];

    const title = current.name;
    const artist = current.artist?.["#text"] || "Unknown";

    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
      `${artist} ${title}`
    )}`;

    const isPlaying =
      current["@attr"]?.nowplaying === "true";

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      spotifyUrl,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
