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
import { usePersistedState } from "@/hooks/usePersistedState.svelte";
import { usePersistedThemes } from "@/hooks/usePersistedThemes.svelte";

export const isAnimationPaused = usePersistedState("isAnimationPaused", DEFAULT_ANIMATION_PAUSED);
export const handleAnimationPaused = (cond?: boolean) => {
  if (typeof cond === 'boolean') {
    isAnimationPaused.current = cond;
    return;
  }
  isAnimationPaused.current = !isAnimationPaused.current;
};

export const enableRotation = usePersistedState("rotationEnabled", DEFAULT_ROTATION_ENABLED);
export const handleEnableRotation = () => (enableRotation.current = !enableRotation.current);

export const enablePan = usePersistedState("panEnabled", DEFAULT_PAN_ENABLED);
export const handleEnablePan = () => (enablePan.current = !enablePan.current);

export const enableZoom = usePersistedState("zoomEnabled", DEFAULT_ZOOM_ENABLED);
export const handleEnableZoom = () => (enableZoom.current = !enableZoom.current);

export const themes: { current: Theme[] } = usePersistedThemes("themes", DEFAULT_THEMES);

export const currentThemeIndex = usePersistedState("themeIndex", DEFAULT_THEME_INDEX);

const currentTheme = $derived(themes.current[currentThemeIndex.current]);

export const getCurrentTheme = () => currentTheme;

export const handleThemeSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  currentThemeIndex.current = target.selectedIndex;
};

export const addNewTheme = (theme: Theme) => {
  themes.current.push(theme);
  currentThemeIndex.current = themes.current.length - 1;
};

export const updateTheme = (theme: Theme) => {
  themes.current = [...themes.current.slice(0, currentThemeIndex.current), theme, ...themes.current.slice(currentThemeIndex.current + 1)];
};

export const deleteTheme = () => {
  if (themes.current.length === 1) return;
  if (currentThemeIndex.current === themes.current.length - 1) {
    themes.current.pop();
    currentThemeIndex.current = themes.current.length - 1;
  } else if (currentThemeIndex.current < themes.current.length - 1) {
    themes.current = [...themes.current.slice(0, currentThemeIndex.current), ...themes.current.slice(currentThemeIndex.current + 1)];
  }
};

export const setThemeFromIndex = (index: number) => {
  currentThemeIndex.current = index;
};

export const scenes = $state({ current: DEFAULT_SCENES });

export const currentScene: { current: SceneName } = $state({ current: scenes.current[DEFAULT_SCENE_INDEX] });

export const previousScene: { current: SceneName } = $state({ current: scenes.current[DEFAULT_SCENE_INDEX] });

export const isTransitionRunning = $state({ current: false });
export const scenePropsRequireUpdate = $state({ current: false });
