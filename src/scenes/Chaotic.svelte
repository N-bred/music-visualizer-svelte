<script>
  import { InstancedMesh, Instance } from "@threlte/extras";
  import { T } from "@threlte/core";
  import { FFT } from "@/store/State.svelte";
  import { Color } from "three";
  const colorPrimary = new Color("#ff0000");
  const colorSecondary = new Color("#0000ff");
  const angle = 2048 / (2 * 180);
</script>

<InstancedMesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial />

  {#if FFT.current}
    {#each FFT.current as amplitude, i (i)}wsvelt
      <Instance
        position.x={Math.cos((i * angle * Math.PI) / 180) * 250}
        position.y={Math.sin((i * angle * Math.PI) / 180) * 250}
        position.z={i}
        rotation.z={angle * i}
        scale.y={Math.max(amplitude / 2, 1)}
        color={colorPrimary.clone().lerp(colorSecondary, amplitude / 180)}
      />
    {/each}
  {/if}
</InstancedMesh>
