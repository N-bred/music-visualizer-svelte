<script lang="ts">
  import Camera from "./Camera.svelte";
  import { T, useTask } from "@threlte/core";
  import { isAnimationPaused } from "@/store/PropertiesPanel.svelte";
  import { FFT } from "@/store/State.svelte";
  import Chaotic from "@/scenes/Chaotic.svelte";
  let rotation = $state(0);

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
