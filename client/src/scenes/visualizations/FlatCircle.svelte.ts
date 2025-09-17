import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneDynamicValues, SceneExport, Vector3Return } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";

const VISUALIZATION_NAME = "FlatCircle";
const radius = useLocalStorage<number>(`${VISUALIZATION_NAME}Radius`, 250);

const modifiers = $state({
  radius: {
    set: radius.set,
    value: radius.value,
    type: "number",
    label: "Set radius: ",
    min: 1,
  },
});

const dynamicValues: SceneDynamicValues = (amplitude: number) => {
  return {
    scale: [Math.max(amplitude, 1), 1, 1],
  };
};

const precalculateValues = () => {
  const angle = (Math.PI * 2) / FFT_QUANTITY;
  const values = [];
  for (let i = 0; i < FFT_QUANTITY; ++i) {
    values.push({
      position: [Math.cos(i * angle) * modifiers.radius.value, Math.sin(i * angle) * modifiers.radius.value, 0] as Vector3Return,
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
