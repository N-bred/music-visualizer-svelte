<script lang="ts">
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T, useTask } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  import { currentScene, isTransitionRunning, previousScene } from "@/store/PropertiesPanel.svelte";
  import sceneMap from "@/scenes/";
  import { lerpSceneProperties } from "@/utils/";
  import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
  import type { Vector3Return } from "@/types/";

  const { color } = $props();

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
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each { length: FFT_QUANTITY } as _, i (i)}
      <Instance
        position={finalSceneProperties[i].position}
        rotation={finalSceneProperties[i].rotation}
        scale={dynamicValues(FFT.current[i]).scale}
        color={color(FFT.current[i], 100)}
      />
      <Instance
        position.x={finalSceneProperties[i].position[0] * -1}
        position.y={finalSceneProperties[i].position[1] * -1}
        position.z={finalSceneProperties[i].position[2]}
        rotation={finalSceneProperties[i].rotation}
        scale={dynamicValues(FFT.current[i]).scale}
        color={color(FFT.current[i], 400)}
      />
    {/each}
  {/if}
</InstancedMesh>
