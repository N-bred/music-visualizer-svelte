<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 1500]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0);
  }}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>
