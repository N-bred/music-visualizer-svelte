<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { PerfMonitor } from '@threlte/extras'
  import Scene from "@/components/Scene.svelte";
  import Camera from "@/components/Camera.svelte";
  import { isAnimationPaused } from "@/store/PropertiesPanel.svelte";
  import { handleResize } from "@/utils/handleResize";
  import { onMount } from "svelte";

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<div class="canvas-container {isAnimationPaused.current ? 'disabled' : ''}">
  <Canvas renderMode="manual">
    <PerfMonitor/>
    <Camera />
    <Scene />
  </Canvas>
  <div class="canvas-buttons">
    <button aria-label="button" class="canvas-theater-button" title="Theater Mode"><i class="fa fa-television" aria-hidden="true"></i></button>
    <button aria-label="button" class="canvas-fullscreen-button" title="Fullscreen"><i class="fa fa-square-o" aria-hidden="true"></i></button>
  </div>
</div>
