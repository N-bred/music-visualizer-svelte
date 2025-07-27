import type { Song } from "@/types";
import { randomID } from "@/utils/";
const MODE = import.meta.env.MODE;
const DEVELOPMENT = "development";
const PRODUCTION = "production";

export const SONGS_FOLDER = "/public/songs/";
export let DEFAULT_SONGS: Song[] = [];

if (MODE === DEVELOPMENT) {
  DEFAULT_SONGS = [
    {
      id: randomID("System of a Down", "Forest"),
      artistName: "System of a Down",
      songName: "Forest",
      fileName: "Forest.mp3",
    },
    {
      id: randomID("Therion", "Clavicula Nox"),
      artistName: "Therion",
      songName: "Clavicula Nox",
      fileName: "Clavicula Nox.mp3",
    },
  ];
}
