import { currentTheme } from "@/store/PropertiesPanel.svelte";

const themesColors = () => {
  const color = $derived((amplitude: number, max: number) =>
    currentTheme.current.color.clone().lerp(currentTheme.current.transitionColor, amplitude / max)
  );
  const fallbackColor = $derived(currentTheme.current.backgroundColor);
  return {
    color,
    fallbackColor,
  };
};

export const useThemesColors = () => themesColors();
