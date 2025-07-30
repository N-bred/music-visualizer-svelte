<script lang="ts">
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  import { currentScene } from "@/store/PropertiesPanel.svelte";
  import sceneMap from "@/scenes/";
  import type { BoxGeometry } from "three";

  let geometryRef: BoxGeometry | undefined = $state();
  let sceneProperties = $derived(sceneMap[currentScene.current]);
  let calculatedValues = $derived(sceneMap[currentScene.current].precalculateValues(FFT.current || []));

  $effect(() => {
    if (geometryRef) {
      sceneMap[currentScene.current].onCreate(geometryRef);
    }
  });

  const { color } = $props();
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 1, 1]} bind:ref={geometryRef} />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each FFT.current as amplitude, i (i)}
      {@const dynamicValue = sceneProperties.dynamicValues(amplitude)}
      <Instance
        position={calculatedValues[i].position}
        rotation={calculatedValues[i].rotation}
        scale={dynamicValue.scale}
        color={color(amplitude, 180)}
      />
    {/each}
  {/if}
</InstancedMesh>
