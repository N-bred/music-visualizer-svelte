<script lang="ts">
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  const { color, fallbackColor, showing } = $props();
</script>

<InstancedMesh>
  <T.BoxGeometry
    args={[1, 1, 1]}
    oncreate={(g) => {
      g.translate(1 * 0.5, 0, 0);
    }}
  />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each FFT.current as amplitude, i (i)}
      <Instance
        position.x={Math.cos(i * ((Math.PI * 2) / FFT.current.length)) * 250}
        position.y={Math.sin(i * ((Math.PI * 2) / FFT.current.length)) * 250}
        position.z={1}
        scale.x={Math.max(amplitude / 2, 1)}
        color={showing ? color(amplitude, 180) : fallbackColor}
      />
    {/each}
  {/if}
</InstancedMesh>
