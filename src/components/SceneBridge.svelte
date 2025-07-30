<script lang="ts">
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T, useTask } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  import { currentScene, isTransitionRunning, previousScene } from "@/store/PropertiesPanel.svelte";
  import sceneMap from "@/scenes/";
  import { lerpSceneProperties } from "@/utils/";

  let targetSceneProperties = $derived(sceneMap[currentScene.current].precalculateValues(FFT.current || []));

  let finalSceneProperties = $derived(sceneMap[previousScene.current].precalculateValues(FFT.current || []));

  let dynamicValues = $derived(sceneMap[previousScene.current].dynamicValues);

  let transitionTimer = $state(0);

  useTask((delta) => {
    if (isTransitionRunning.current) {
      if (transitionTimer < 1) {
        finalSceneProperties = lerpSceneProperties(finalSceneProperties, targetSceneProperties, transitionTimer, "easeInOutSine");
        transitionTimer += delta;
      } else {
        isTransitionRunning.current = false;
        transitionTimer = 0;
        previousScene.current = currentScene.current;
      }
    }
  });

  const { color } = $props();
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each { length: FFT.current.length / 2 } as _, i (i)}
      <Instance
        position={finalSceneProperties[i].position}
        rotation={finalSceneProperties[i].rotation}
        scale={dynamicValues(FFT.current[i]).scale}
        color={color(FFT.current[i], 150)}
      />
    {/each}
  {/if}
</InstancedMesh>
