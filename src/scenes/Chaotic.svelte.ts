import type { SceneExport } from "@/types";
import type { BoxGeometry } from "three";
import { Vector3 } from "three";

const angle = 2048 / (2 * 180);
const radius = 250;
const degree = 180;

const onCreate = (geometry: BoxGeometry) => {};

const dynamicValues = (amplitude: number) => {
  return {
    scale: [1, Math.max(amplitude / 2, 1), 1],
  };
};

const precalculateValues = (FFT: number[]) => {
  const values = [];
  for (let i = 0; i < FFT.length; ++i) {
    values.push({
      position: [Math.cos((i * angle * Math.PI) / degree) * radius, Math.sin((i * angle * Math.PI) / degree) * radius, i],
      rotation: [0, 0, angle * i],
    });
  }
  return values;
};

export default {
  onCreate,
  dynamicValues,
  precalculateValues,
} as SceneExport;
