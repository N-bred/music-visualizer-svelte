import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneExport } from "@/types";

const radius = 250;

const dynamicValues = (amplitude: number) => {
  return {
    scale: [Math.max(amplitude, 1), 1, 1],
  };
};

const precalculateValues = (FFT: number[]) => {
  const angle = (Math.PI * 2) / FFT_QUANTITY;
  const values = [];
  for (let i = 0; i < FFT_QUANTITY; ++i) {
    values.push({
      position: [Math.cos(i * angle) * radius, Math.sin(i * angle) * radius, 0],
      rotation: [0, 0, angle],
    });
  }
  return values;
};

export default {
  dynamicValues,
  precalculateValues,
} as SceneExport;
