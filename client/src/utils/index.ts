import type { Song, Theme, Vector3Return, SceneProperties } from "@/types";
import { useLerp, type LerpFunctions } from "./lerp";
import { Color } from "three";

export function randomID(artistName: string, songName: string) {
  return artistName + " " + songName;
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

export const lerp3DVector = (props1: Vector3Return, props2: Vector3Return, alpha: number, lerpType: LerpFunctions = "linear"): Vector3Return => {
  const lerp = useLerp(lerpType);
  return [lerp(props1[0], props2[0], alpha)!, lerp(props1[1], props2[1], alpha)!, lerp(props1[2], props2[2], alpha)!];
};

export const lerpSceneProperties = (
  sceneProperties1: SceneProperties,
  sceneProperties2: SceneProperties,
  alpha: number,
  lerpType?: LerpFunctions
): SceneProperties => {
  const properties = [];

  for (let i = 0; i < sceneProperties1.length; ++i) {
    const position = lerp3DVector(sceneProperties1[i].position, sceneProperties2[i].position, alpha, lerpType);
    const rotation = lerp3DVector(sceneProperties1[i].rotation, sceneProperties2[i].rotation, alpha, lerpType);
    properties.push({
      position,
      rotation,
    });
  }

  return properties;
};

export function createThemeFromJSON(
  jsonTheme: Theme[] | { name: string; color: number; transitionColor: number; backgroundColor: number }[]
): Theme[] {
  return jsonTheme
    .filter((theme) => theme.name !== "")
    .map((theme) => ({
      name: theme.name,
      color: new Color(theme.color),
      transitionColor: new Color(theme.transitionColor),
      backgroundColor: new Color(theme.backgroundColor),
    }));
}
