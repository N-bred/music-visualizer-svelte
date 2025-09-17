import type { Song, Theme } from "@/types";
import { randomID } from "@/utils/";
import { Color } from "three";

const MODE = import.meta.env.MODE;
const DEVELOPMENT = "development";
const PRODUCTION = "production";

export const CSS_VARIABLE_NAMES = [
  {
    name: "--accent-color",
  },
  {
    name: "--song-selected-color",
  },
];

export const FFT_SIZE = 2048;
export const FFT_QUANTITY = FFT_SIZE / 2;

export const SONGS_FOLDER = "/songs/";
export let DEFAULT_SONGS: Song[] = [];

// if (MODE === DEVELOPMENT) {
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
// }

export const DEFAULT_VOLUME = 1;

export const DEFAULT_THEMES: Theme[] = [
  {
    name: "Purple",
    color: new Color(0x2607a6),
    transitionColor: new Color(0x5500ff),
    backgroundColor: new Color(0x000000),
  },
  {
    name: "Pink",
    color: new Color(0xff00ff),
    transitionColor: new Color(0x00ff00),
    backgroundColor: new Color(0x000000),
  },
];

export const DEFAULT_THEME_INDEX = 0;
export const DEFAULT_ANIMATION_PAUSED = false
export const DEFAULT_ROTATION_ENABLED = true;
export const DEFAULT_PAN_ENABLED = true;
export const DEFAULT_ZOOM_ENABLED = true;
