<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "@/components/Scene.svelte";
  import { isAnimationPaused } from "@/store/PropertiesPanel.svelte";
</script>

<div class="canvas-container {isAnimationPaused.current ? 'disabled' : ''}">
  <Canvas autoRender={!isAnimationPaused.current}>
    <Scene />
  </Canvas>
  <div class="canvas-buttons">
    <button aria-label="button" class="canvas-theater-button" title="Theater Mode"><i class="fa fa-television" aria-hidden="true"></i></button>
    <button aria-label="button" class="canvas-fullscreen-button" title="Fullscreen"><i class="fa fa-square-o" aria-hidden="true"></i></button>
  </div>
</div>
