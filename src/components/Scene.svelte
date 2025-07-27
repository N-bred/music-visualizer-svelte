<script lang="ts">
  import Camera from "./Camera.svelte";
  import { T, useTask } from "@threlte/core";
  import { isAnimationPaused } from "@/store/PropertiesPanel.svelte";
  import { FFT } from "@/store/State.svelte";
  import Chaotic from "@/scenes/Chaotic.svelte";
  import { onMount } from "svelte";
  let rotation = $state(0);

  onMount(() => {
    const handleResize = () => {
      const canvas = document.querySelector("canvas")!;
      canvas.style.width = "0";
      canvas.style.height = "0";
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useTask((delta) => {
    if (!FFT.reload || isAnimationPaused.current) return;
    FFT.reload();
    rotation += delta;
  });
</script>

<Camera />
<T.Group rotation.z={rotation}>
  <Chaotic />
</T.Group>
