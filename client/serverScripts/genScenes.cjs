const path = require("path");
const fs = require("fs");
const base = __dirname;
const src = path.dirname(__dirname) + "/src/scenes";
const exceptions = [""];
const scenes = fs.readdirSync(src + '/visualizations/').filter((p) => p !== exceptions.find((a) => a === p));
const scenesFormatted = scenes.map((scene) => scene.replace(".svelte.ts", ""));

const template = `
import type { SceneMap } from "@/types/";

${scenesFormatted
  .map((scene) => `import ${scene} from "@/scenes/visualizations/${scene}.svelte";\n`)
  .toString()
  .replaceAll(",", "")}
export const DEFAULT_SCENES = [${scenesFormatted
  .map((scene) => `"${scene}"`)
  .toString()
  .replaceAll(",", ", ")}] as const;
export const DEFAULT_SCENE_INDEX = 0;

export default {
${scenesFormatted
  .map((scene) => `   ${scene}: ${scene}`)
  .toString()
  .replaceAll(",", ",\n")}
} as SceneMap;`;

fs.writeFileSync(src + "/index.svelte.ts", template);
