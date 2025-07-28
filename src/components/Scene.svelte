<script lang="ts">
  import { T, useTask, useThrelte } from "@threlte/core";
  import { isAnimationPaused } from "@/store/PropertiesPanel.svelte";
  import { FFT } from "@/store/State.svelte";
  import Chaotic from "@/scenes/Chaotic.svelte";
  import { onMount } from "svelte";
  const { advance } = useThrelte();
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
</script>

<T.Group rotation.z={rotation}>
  <Chaotic />
</T.Group>
