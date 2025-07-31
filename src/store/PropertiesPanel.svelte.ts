import {
  DEFAULT_THEMES,
  DEFAULT_ANIMATION_PAUSED,
  DEFAULT_PAN_ENABLED,
  DEFAULT_ROTATION_ENABLED,
  DEFAULT_THEME_INDEX,
  DEFAULT_ZOOM_ENABLED,
  DEFAULT_SCENES,
  DEFAULT_SCENE_INDEX,
} from "./DefaultValues.svelte";
import type { SceneName, Theme } from "@/types";

export const isAnimationPaused = $state({ current: DEFAULT_ANIMATION_PAUSED });
export const handleAnimationPaused = () => (isAnimationPaused.current = !isAnimationPaused.current);

export const enableRotation = $state({ current: DEFAULT_ROTATION_ENABLED });
export const handleEnableRotation = () => (enableRotation.current = !enableRotation.current);

export const enablePan = $state({ current: DEFAULT_PAN_ENABLED });
export const handleEnablePan = () => (enablePan.current = !enablePan.current);

export const enableZoom = $state({ current: DEFAULT_ZOOM_ENABLED });
export const handleEnableZoom = () => (enableZoom.current = !enableZoom.current);

export const themes: { current: Theme[] } = $state({ current: DEFAULT_THEMES });
export const currentTheme = $state({ current: themes.current[DEFAULT_THEME_INDEX] });
const currentThemeIndex = $derived(themes.current.findIndex((theme) => theme.name === currentTheme.current.name));

export const getCurrentThemeIndex = () => currentThemeIndex;

export const addNewTheme = (theme: Theme) => {
  const index = themes.current.length - 1;
  themes.current = [...themes.current, theme];
  currentTheme.current = themes.current[index + 1];
};

export const updateTheme = (theme: Theme) => {
  const index = themes.current.findIndex((theme) => theme.name === currentTheme.current.name);
  themes.current[index] = theme;
  currentTheme.current = themes.current[index];
};

export const deleteTheme = () => {
  let index = themes.current.findIndex((theme) => theme.name === currentTheme.current.name);
  const length = themes.current.length - 1;

  if (index > length - 1) {
    index -= 1;
  }

  themes.current = themes.current.filter((theme) => theme.name !== currentTheme.current.name);

  currentTheme.current = themes.current[index];
};

export const setThemeFromIndex = (index: number) => {
  currentTheme.current = themes.current[index];
};

export const scenes = $state({ current: DEFAULT_SCENES });

export const currentScene: { current: SceneName } = $state({ current: scenes.current[DEFAULT_SCENE_INDEX] });

export const previousScene: { current: SceneName } = $state({ current: scenes.current[DEFAULT_SCENE_INDEX] });

export const isTransitionRunning = $state({ current: false });
