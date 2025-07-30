import { currentTheme } from "@/store/PropertiesPanel.svelte";

const color = $derived((amplitude: number, max: number) => currentTheme.current.color.clone().lerp(currentTheme.current.transitionColor, amplitude / max));

const fallbackColor = $derived(currentTheme.current.backgroundColor);

export const useThemesColors = () => ({color, fallbackColor});

