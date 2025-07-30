import type { SceneExport } from "@/types";

const radius = 250;

const dynamicValues = (amplitude: number) => {
  return {
    scale: [Math.max(amplitude / 2, 1), 1, 1],
  };
};

const precalculateValues = (FFT: number[]) => {
  const quantity = FFT.length / 2;
  const angle = (Math.PI * 2) / quantity;
  const values = [];
  for (let i = 0; i < FFT.length; ++i) {
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
