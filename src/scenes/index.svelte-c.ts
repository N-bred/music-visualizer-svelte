import type { SceneMap } from "@/types/";
import Chaotic from "./Chaotic.svelte";
import FlatCircle from "./FlatCircle.svelte";

export const DEFAULT_SCENES = ["Chaotic", "FlatCircle"] as const;
export const DEFAULT_SCENE_INDEX = 0;

export default {
  Chaotic: Chaotic,
  FlatCircle: FlatCircle,
} as SceneMap;
