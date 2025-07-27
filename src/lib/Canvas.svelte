<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import { isAnimationPaused } from "../store/State.svelte";
</script>

<Canvas autoRender={!isAnimationPaused.current}>
  <Scene />
</Canvas>
