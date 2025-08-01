<script lang="ts">
  import { onMount } from "svelte";
  import * as T from "three";

  let canvasContainerRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;

  const SIZE = $state({
    width: 0,
    height: 0,
  });

  let camera: T.PerspectiveCamera;
  let renderer: T.WebGLRenderer;

  onMount(() => {
    if (!canvasRef || !canvasContainerRef) return;
    SIZE.width = canvasContainerRef.getBoundingClientRect().width;
    SIZE.height = canvasContainerRef.getBoundingClientRect().height;
    camera = new T.PerspectiveCamera(75, SIZE.width / SIZE.height, 10, 1500);
    camera.position.set(0, 0, 1200);
    camera.lookAt(new T.Vector3(0, 0, 0));

    renderer = new T.WebGLRenderer({ canvas: canvasRef });
    renderer.setSize(SIZE.width, SIZE.height);

    window.addEventListener("resize", () => {
      SIZE.width = canvasContainerRef.getBoundingClientRect().width;
      SIZE.height = canvasContainerRef.getBoundingClientRect().height;

      camera.aspect = SIZE.width / SIZE.height;
      camera.updateProjectionMatrix();
      renderer.setSize(SIZE.width, SIZE.height);
    });
  });
</script>

<div class="canvas-container disabledd" bind:this={canvasContainerRef}>
  <canvas bind:this={canvasRef}></canvas>
  <div class="canvas-buttons">
    <button aria-label="button" class="canvas-theater-button" title="Theater Mode"><i class="fa fa-television" aria-hidden="true"></i></button>
    <button aria-label="button" class="canvas-fullscreen-button" title="Fullscreen"><i class="fa fa-square-o" aria-hidden="true"></i></button>
  </div>
</div>
