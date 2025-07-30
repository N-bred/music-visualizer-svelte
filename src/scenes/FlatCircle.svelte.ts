import type { SceneExport } from "@/types";
import type { BoxGeometry } from "three";

const radius = 250;

const onCreate = (geometry: BoxGeometry) => {
  geometry.translate(1 * 0.5, 0, 0);
};

const dynamicValues = (amplitude: number) => {
  return {
    scale: [Math.max(amplitude / 2, 1), 1, 1],
  };
};

const precalculateValues = (FFT: number[]) => {
  const values = [];
  for (let i = 0; i < FFT.length; ++i) {
    values.push({
      position: [Math.cos(i * ((Math.PI * 2) / FFT.length)) * radius, Math.sin(i * ((Math.PI * 2) / FFT.length)) * radius, 0],
      rotation: [0, 0, 0],
    });
  }
  return values;
};

export default {
  onCreate,
  dynamicValues,
  precalculateValues,
} as SceneExport;
