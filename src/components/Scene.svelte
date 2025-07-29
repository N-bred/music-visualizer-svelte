<script lang="ts">
  import { T, useTask, useThrelte } from "@threlte/core";
  import { isAnimationPaused, currentTheme, currentScene } from "@/store/PropertiesPanel.svelte";
  import { FFT } from "@/store/State.svelte";
  import { onMount } from "svelte";
  import { DEFAULT_SCENES, DEFAULT_SCENES_NAMES } from "@/store/DefaultValues.svelte";
  import { useThemesColors } from "@/hooks/useThemeColors.svelte";
  import type { SceneName } from "@/types";
  const { advance, scene } = useThrelte();
  let firstRender = 0;

  onMount(() => {
    const handleResize = () => {
      const canvas = document.querySelector("canvas")!;
      canvas.style.width = "0";
      canvas.style.height = "0";
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  $effect(() => {
    scene.background = currentTheme.current.backgroundColor;
  });

  let rotation = $state(0);
  useTask((delta) => {
    if (!FFT.reload) return;
    FFT.reload();
    rotation += delta;

    if (isAnimationPaused.current) {
      if (firstRender < 2) {
        firstRender += 1;
        advance();
      }
    } else {
      advance();
    }
  });

  const { color, fallbackColor } = useThemesColors();
</script>

<T.Group rotation.z={rotation}>
  {#each DEFAULT_SCENES_NAMES as key}
    {@const Component = DEFAULT_SCENES[key]};
    <Component {color} {fallbackColor} showing={currentScene.current === key} />
  {/each}
</T.Group>
