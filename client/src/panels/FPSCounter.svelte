<script lang="ts">
  import { stats } from "@/store/CanvasPanel.svelte";
  import { onMount } from "svelte";

  let fpsCounterContainerRef: HTMLDivElement;
  onMount(() => {
    if (!fpsCounterContainerRef) return;
    fpsCounterContainerRef.appendChild(stats.dom);
    return () => fpsCounterContainerRef.removeChild(stats.dom);
  });
</script>

<div class="fpsCounter" bind:this={fpsCounterContainerRef}></div>
