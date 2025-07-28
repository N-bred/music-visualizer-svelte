<script lang="ts">
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  import type { Theme } from "@/types";
  const { theme }: { theme: Theme } = $props();
  const angle = 2048 / (2 * 180);
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each FFT.current as amplitude, i (i)}
      <Instance
        position.x={Math.cos((i * angle * Math.PI) / 180) * 250}
        position.y={Math.sin((i * angle * Math.PI) / 180) * 250}
        position.z={i}
        rotation.z={angle * i}
        scale.y={Math.max(amplitude / 2, 1)}
        color={theme.color.clone().lerp(theme.transitionColor, amplitude / 180)}
      />
    {/each}
  {/if}
</InstancedMesh>
