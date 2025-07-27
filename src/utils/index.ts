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
