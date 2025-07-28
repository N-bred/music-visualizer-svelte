import type { Song } from "@/types";
import { createSongList } from "@/utils/";
import { DEFAULT_SONGS, SONGS_FOLDER } from "./DefaultValues.svelte";

export const songList: { current: Song[] } = $state({ current: createSongList(DEFAULT_SONGS, SONGS_FOLDER) });

export const songCurrentIndex = $state({ current: 0 });

const currentSong = $derived(songList.current[songCurrentIndex.current]);

export const getCurrentSong = () => currentSong;

export const shouldPlayNext = $state({ current: false });

export const handleSelectSong = (index: number) => {
  songCurrentIndex.current = index;
  shouldPlayNext.current = true;
};

export const addSong = (song: Song) => {
  songList.current = [...songList.current, song];
  handleSelectSong(songList.current.length - 1);
};

export const handlePreviousSong = () => {
  const nextSong = songCurrentIndex.current - 1;
  if (nextSong < 0) return;
  handleSelectSong(nextSong);
};

export const handleNextSong = () => {
  const nextSong = songCurrentIndex.current + 1;
  if (nextSong > songList.current.length - 1) return;
  handleSelectSong(nextSong);
};
