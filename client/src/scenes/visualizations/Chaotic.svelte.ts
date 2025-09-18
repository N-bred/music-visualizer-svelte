import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneDynamicValues, SceneExport, SceneProperties, Vector3Return } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";

const VISUALIZATION_NAME = "Chaotic";
const radius = useLocalStorage<number>(`${VISUALIZATION_NAME}Radius`, 250);
const degrees = useLocalStorage<number>(`${VISUALIZATION_NAME}Degrees`, 180);

const modifiers = $state({
  radius: {
    set: radius.set,
    value: radius.value,
    type: "number",
    label: "Set radius: ",
    min: 0,
  },
  degrees: {
    set: degrees.set,
    value: degrees.value,
    type: "number",
    label: "Set degrees: ",
    min: 1,
  },
});

const dynamicValues: SceneDynamicValues = (amplitude: number) => {
  return {
    scale: [1, Math.max(amplitude, 1), 1],
  };
};

const precalculateValues = (): SceneProperties => {
  const angle = FFT_QUANTITY / (2 * modifiers.degrees.value);
  const values = [];

  for (let i = 0; i < FFT_QUANTITY; ++i) {
    values.push({
      position: [
        Math.cos((i * angle * Math.PI) / modifiers.degrees.value) * modifiers.radius.value,
        Math.sin((i * angle * Math.PI) / modifiers.degrees.value) * modifiers.radius.value,
        i,
      ] as Vector3Return,
      rotation: [0, 0, angle * i] as Vector3Return,
    });
  }

  return values;
};

export default {
  dynamicValues,
  precalculateValues,
  modifiers,
} as SceneExport;
