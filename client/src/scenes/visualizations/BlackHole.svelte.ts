import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneDynamicValues, SceneExport, SceneModifier, SceneProperties, Vector3Return } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";

const VISUALIZATION_NAME = "BlackHole";
const radius = useLocalStorage<number>(`${VISUALIZATION_NAME}radius`, 1000);
const angleFactor = useLocalStorage<number>(`${VISUALIZATION_NAME}angleFactor`, 180);

const modifiers = $state<Record<string, SceneModifier>>({
  radius: {
    set: radius.set,
    value: radius.value,
    type: "number",
    label: "Set radius: ",
    min: 0,
  },
  angleFactor: {
    set: angleFactor.set,
    value: angleFactor.value,
    type: "number",
    label: "Set angleFactor: ",
    min: 0,
  },
});

const dynamicValues: SceneDynamicValues = (amplitude: number) => {
  return {
    scale: [1, 1, amplitude],
  };
};

const precalculateValues = (): SceneProperties => {
  const values = [];

  for (let i = 0; i < FFT_QUANTITY; ++i) {
    const t = i / FFT_QUANTITY;
    const theta = t * Math.PI * 2 * modifiers.angleFactor.value;
    const r = Math.exp(-t * 3) * modifiers.radius.value;
    const z = -t * t * i;
    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;

    values.push({
      position: [x, y, z] as Vector3Return,
      rotation: [0, 0, theta] as Vector3Return,
    });
  }

  return values;
};

export default {
  dynamicValues,
  precalculateValues,
  modifiers,
} as SceneExport;
