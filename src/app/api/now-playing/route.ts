import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const USERNAME = "noeldcosta";
const API_KEY = process.env.LASTFM_API_KEY!;

export async function GET() {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=2`,
      { cache: "no-store" }
    );

    const data = await response.json();
    let tracks = data?.recenttracks?.track;

    if (!tracks) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }

    const current = tracks[0];
    const isPlaying = !current.date;

    const trackToShow = isPlaying
      ? current
      : tracks[0]; // show most recent finished track

    const title = trackToShow.name;
    const artist = trackToShow.artist?.["#text"] || "Unknown";

    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
      `${artist} ${title}`
    )}`;

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
