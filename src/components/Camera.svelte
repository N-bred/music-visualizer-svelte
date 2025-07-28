<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { enableRotation, enablePan, enableZoom } from "@/store/PropertiesPanel.svelte";
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1500]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0);
  }}
>
  <OrbitControls enableDamping enableRotate={enableRotation.current} enablePan={enablePan.current} enableZoom={enableZoom.current} />
</T.PerspectiveCamera>
