import type { SceneExport } from "@/types";

const radius = 250;
const degree = 180;

const dynamicValues = (amplitude: number) => {
  return {
    scale: [1, Math.max(amplitude / 2, 1), 1],
  };
};

const precalculateValues = (FFT: number[]) => {
  const quantity = FFT.length / 2;
  const angle = quantity / (2 * degree);
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
  dynamicValues,
  precalculateValues,
} as SceneExport;
