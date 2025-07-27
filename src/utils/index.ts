import type { Song } from "@/types";

export function randomID(artistName: string, songName: string) {
  return artistName + " " + songName;
}

export function createSongList(songs: Song[], songsFolder: string) {
  return songs.map((song) => ({
    src: songsFolder + song.artistName + " - " + song.fileName,
    ...song,
  }));
}

export function calculateMinutesAndSeconds(duration: number) {
  const min = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");

  return {
    min,
    sec,
  };
}
