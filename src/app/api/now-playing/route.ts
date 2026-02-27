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

    // Find currently playing
    const currentlyPlaying = tracks.find(
      (track: any) => track["@attr"]?.nowplaying === "true"
    );

    let trackToShow;

    if (currentlyPlaying) {
      trackToShow = currentlyPlaying;
    } else {
      // Find most recent completed track
      trackToShow = tracks.find((track: any) => track.date);
    }

    if (!trackToShow) {
      return NextResponse.json({ isPlaying: false });
    }

    const title = trackToShow.name;
    const artist = trackToShow.artist?.["#text"] || "Unknown";

    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
      `${artist} ${title}`
    )}`;

    return NextResponse.json({
      isPlaying: Boolean(currentlyPlaying),
      title,
      artist,
      spotifyUrl,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
