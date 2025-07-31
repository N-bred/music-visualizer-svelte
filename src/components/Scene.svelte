<script lang="ts">
  import { T, useTask, useThrelte } from "@threlte/core";
  import { isAnimationPaused, currentTheme } from "@/store/PropertiesPanel.svelte";
  import { FFT } from "@/store/State.svelte";
  import { onMount } from "svelte";
  import { useThemesColors } from "@/hooks/useThemeColors.svelte";
  import SceneBridge from "./SceneBridge.svelte";
  import { handleResize } from "@/utils/handleResize";
  const { advance, scene } = useThrelte();

  onMount(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  $effect(() => {
    scene.background = currentTheme.current.backgroundColor;
  });

  let rotation = $state(0);
  let firstRender = 0;
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

  const { color } = useThemesColors();
</script>

<T.Group rotation.z={rotation}>
  <SceneBridge {color} />
</T.Group>
