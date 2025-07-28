import type { Theme } from "@/types";
import {
  DEFAULT_THEMES,
  DEFAULT_ANIMATION_PAUSED,
  DEFAULT_PAN_ENABLED,
  DEFAULT_ROTATION_ENABLED,
  DEFAULT_THEME_INDEX,
  DEFAULT_ZOOM_ENABLED,
} from "./DefaultValues.svelte";

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
