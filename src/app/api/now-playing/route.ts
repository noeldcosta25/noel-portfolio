import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const USERNAME = "noeldcosta";
const API_KEY = process.env.LASTFM_API_KEY!;

const filePath = path.join(process.cwd(), "last-track.json");

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

    // Currently playing tracks DO NOT have a date field
    const isPlaying = !current.date;

    const trackData = { title, artist, spotifyUrl };

    if (isPlaying) {
      fs.writeFileSync(filePath, JSON.stringify(trackData));
      return NextResponse.json({
        isPlaying: true,
        ...trackData,
      });
    }

    // If paused, read last saved playing track
    if (fs.existsSync(filePath)) {
      const saved = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return NextResponse.json({
        isPlaying: false,
        ...saved,
      });
    }

    return NextResponse.json({
      isPlaying: false,
      ...trackData,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
