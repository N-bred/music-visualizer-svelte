
import type { SceneMap } from "@/types/";

import Chaotic from "@/scenes/visualizations/Chaotic.svelte";
import FlatCircle from "@/scenes/visualizations/FlatCircle.svelte";
import Spiral from "@/scenes/visualizations/Spiral.svelte";

export const DEFAULT_SCENES = ["Chaotic", "FlatCircle", "Spiral"] as const;
export const DEFAULT_SCENE_INDEX = 0;

export default {
   Chaotic: Chaotic,
   FlatCircle: FlatCircle,
   Spiral: Spiral
} as SceneMap;