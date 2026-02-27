import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const USERNAME = "noeldcosta";
const API_KEY = process.env.LASTFM_API_KEY!;

export async function GET() {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`,
      { cache: "no-store" }
    );

    const data = await response.json();
    let track = data?.recenttracks?.track;

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!Array.isArray(track)) {
      track = [track];
    }

    const current = track[0];

    const title = current.name;
    const artist = current.artist?.["#text"] || "Unknown";

    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
      `${artist} ${title}`
    )}`;

    const isPlaying = !current.date;

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
