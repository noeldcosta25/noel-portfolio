import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const USERNAME = "noeldcosta";
const API_KEY = process.env.LASTFM_API_KEY!;

export async function GET() {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`,
      {
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    const data = await response.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying =
      track["@attr"]?.nowplaying === "true";

    const title = track.name;
    const artist = track.artist?.["#text"] || "Unknown";

    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
      `${artist} ${title}`
    )}`;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      spotifyUrl,
    });
  } catch (error) {
    return NextResponse.json({ isPlaying: false });
  }
}
