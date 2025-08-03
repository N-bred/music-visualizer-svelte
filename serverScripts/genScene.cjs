const path = require("path");
const fs = require("fs");
const src = path.dirname(__dirname) + "/src/scenes";

const VISUALIZATION_NAME = process.argv[2].slice(0, 1).toUpperCase() + process.argv[2].slice(1) ?? "Default";

const template = `
import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { SceneDynamicValues, SceneExport, SceneProperties, Vector3Return } from "@/types";
import { useLocalStorage } from "@/utils/localStorage";

const VISUALIZATION_NAME = "${VISUALIZATION_NAME}";
const property = useLocalStorage<number>([string-literal][dollar-sign]{VISUALIZATION_NAME}property[string-literal], 0);


const modifiers = $state({
  property: {
    set: property.set,
    value: property.value,
    type: "number",
    label: "Set property: ",
    min: 0,
  }
});

const dynamicValues: SceneDynamicValues = (amplitude: number) => {
  return {
    scale: [1, Math.max(amplitude, 1), 1],
  };
};

const precalculateValues = (): SceneProperties => {
  const angle = FFT_QUANTITY / (2 * modifiers.property.value);
  const values = [];

  for (let i = 0; i < FFT_QUANTITY; ++i) {
    values.push({
      position: [
        0,
        0,
        0
      ] as Vector3Return,
      rotation: [0, 0, 0] as Vector3Return,
    });
  }

  return values;
};

export default {
  dynamicValues,
  precalculateValues,
  modifiers,
} as SceneExport;`
  .replaceAll("[string-literal]", "`")
  .replaceAll("[dollar-sign]", "$");

fs.writeFileSync(src + `/${VISUALIZATION_NAME}.svelte.ts`, template);
