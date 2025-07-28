import type { Song, Theme } from "@/types";

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

export function getCssAccentColorValue(theme: Theme) {
  const hsl = { h: 0, s: 0, l: 0 };
  const transitionColorHSL = theme.transitionColor.getHSL({ ...hsl });
  const colorHSL = theme.color.getHSL({ ...hsl });

  if (transitionColorHSL.l > 0.2) {
    return theme.transitionColor.getStyle();
  } else if (colorHSL.l > 0.2) {
    return theme.color.getStyle();
  } else {
    if (transitionColorHSL.l > colorHSL.l) {
      return theme.transitionColor.clone().offsetHSL(0, 0, 0.6).getStyle();
    } else {
      return theme.color.clone().offsetHSL(0, 0, 0.6).getStyle();
    }
  }
}

export function updateCSSVariables(theme: Theme, properties: { name: string }[]) {
  const value = getCssAccentColorValue(theme);

  properties.forEach((property) => {
    document.documentElement.style.setProperty(property.name, value);
  });
}
