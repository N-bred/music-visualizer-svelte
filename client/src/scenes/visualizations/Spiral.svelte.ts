import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneDynamicValues, SceneExport, SceneModifier, SceneProperties, Vector3Return } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";

const VISUALIZATION_NAME = "Spiral";
const radius = useLocalStorage<number>(`${VISUALIZATION_NAME}radius`, 150 / FFT_QUANTITY);
const angleFactor = useLocalStorage<number>(`${VISUALIZATION_NAME}angleFactor`, 140);

const modifiers = $state<Record<string, SceneModifier>>({
  radius: {
    set: radius.set,
    value: radius.value,
    type: "number",
    label: "Set radius: ",
    min: 0,
    max: 1,
    step: 0.01,
  },
  angleFactor: {
    set: angleFactor.set,
    value: angleFactor.value,
    type: "number",
    label: "Set angleFactor: ",
  },
});

const dynamicValues: SceneDynamicValues = (amplitude: number, i?: number) => {
  return {
    scale: [1, 1, Math.max(amplitude, 1)],
  };
};

const precalculateValues = (): SceneProperties => {
  const angle = FFT_QUANTITY / (2 * modifiers.angleFactor.value);
  const values = [];

  for (let i = 0; i < FFT_QUANTITY; ++i) {
    values.push({
      position: [
        Math.cos((i * angle * Math.PI) / modifiers.angleFactor.value) * i * modifiers.radius.value,
        Math.sin((i * angle * Math.PI) / modifiers.angleFactor.value) * i * modifiers.radius.value,
        1.2 * i * (i / FFT_QUANTITY),
      ] as Vector3Return,
      rotation: [0, 0, angle] as Vector3Return,
    });
  }

  return values;
};

export default {
  dynamicValues,
  precalculateValues,
  modifiers,
} as SceneExport;
