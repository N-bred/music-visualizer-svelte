<script lang="ts">
  import { onMount } from "svelte";
  import { PerspectiveCamera, Vector3, WebGLRenderer, Clock } from "three";
  import { OrbitControls } from "three/examples/jsm/Addons.js";
  import { FFT } from "@/store/State.svelte";
  import CustomScene from "@/scenes/Scene.svelte";
  import { isAnimationPaused, enableRotation, enablePan, enableZoom } from "@/store/PropertiesPanel.svelte";

  let canvasContainerRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;

  const SIZE = $state({
    width: 0,
    height: 0,
  });

  let camera: PerspectiveCamera;
  let renderer: WebGLRenderer;
  let orbitControls: OrbitControls;
  let update: () => void;

  onMount(() => {
    if (!canvasRef || !canvasContainerRef) return;
    SIZE.width = canvasContainerRef.getBoundingClientRect().width;
    SIZE.height = canvasContainerRef.getBoundingClientRect().height;
    camera = new PerspectiveCamera(75, SIZE.width / SIZE.height, 1, 3000);
    camera.lookAt(new Vector3(0, 0, 0));

    renderer = new WebGLRenderer({ canvas: canvasRef });
    renderer.setSize(SIZE.width, SIZE.height);

    orbitControls = new OrbitControls(camera, canvasRef);
    orbitControls.enableDamping = true;

    camera.position.set(0, 0, 1000);
    orbitControls.update();

    const scene = new CustomScene(0.3, "easeOutSine");
    const clock = new Clock();

    update = () => {
      FFT.reload?.();
      if (!FFT.current) return;
      const delta = clock.getDelta();
      scene.animate(FFT.current, delta);
      renderer.render(scene, camera);
      orbitControls.update();
    };

    let firstRender = false;
    while (!firstRender) {
      update();
      firstRender = true;
    }

    const handleResize = () => {
      SIZE.width = canvasContainerRef.getBoundingClientRect().width;
      SIZE.height = canvasContainerRef.getBoundingClientRect().height;

      camera.aspect = SIZE.width / SIZE.height;
      camera.updateProjectionMatrix();
      renderer.setSize(SIZE.width, SIZE.height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  $effect(() => {
    if (isAnimationPaused.current) {
      renderer.setAnimationLoop(null);
    } else {
      renderer.setAnimationLoop(update);
    }
  });

  $effect(() => {
    orbitControls.enableRotate = enableRotation.current;
    orbitControls.enablePan = enablePan.current;
    orbitControls.enableZoom = enableZoom.current;
  });
</script>

<div class="canvas-container {isAnimationPaused.current ? 'disabled' : ''}" bind:this={canvasContainerRef}>
  <canvas bind:this={canvasRef}></canvas>
  <div class="canvas-buttons">
    <button aria-label="button" class="canvas-theater-button" title="Theater Mode"><i class="fa fa-television" aria-hidden="true"></i></button>
    <button aria-label="button" class="canvas-fullscreen-button" title="Fullscreen"><i class="fa fa-square-o" aria-hidden="true"></i></button>
  </div>
</div>
