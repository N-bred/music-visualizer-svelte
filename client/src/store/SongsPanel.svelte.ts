import type { Song } from "@/types";
import { GET_DEFAULT_SONGS } from "./DefaultValues.svelte";

export const songList: { current: Song[] } = $state({ current: [] });

const MODE = import.meta.env.MODE;
const DEVELOPMENT = "development";

if (MODE === DEVELOPMENT || __ENVIRONS__ === "web-local") {
  GET_DEFAULT_SONGS()
    .then((songs) => {
      songList.current = songs;
    })
    .catch(console.error);
}

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
