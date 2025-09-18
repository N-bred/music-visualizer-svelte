<script lang="ts">
  import { isAnimationPaused, enablePan, enableRotation, enableZoom } from "@/store/PropertiesPanel.svelte";
  import CheckboxWithLabel from "@/components/micro/CheckboxWithLabel.svelte";
  import Divider from "@/components/micro/Divider.svelte";
  import ThemesHandler from "@/components/ThemesHandler.svelte";
  import SceneHandler from "@/components/SceneHandler.svelte";
</script>

<div class="panel-data">
  <div class="properties-container">
    <SceneHandler />

    <Divider />

    <ThemesHandler />

    <Divider />

    <CheckboxWithLabel bind:checked={isAnimationPaused.current} name="enable-animation" labelContent="Disable Animation?" />

    <CheckboxWithLabel bind:checked={enableRotation.current} name="enable-rotation" labelContent="Enable camera rotation?" />

    <CheckboxWithLabel bind:checked={enablePan.current} name="enable-pan" labelContent="Enable camera pan?" />

    <CheckboxWithLabel bind:checked={enableZoom.current} name="enable-zoom" labelContent="Enable camera zoom?" />

    <button onclick={() => localStorage.clear()}>Clear Storaged Values</button>
  </div>
</div>
