<script lang="ts">
  import { scenes, currentScene, isTransitionRunning, previousScene } from "@/store/PropertiesPanel.svelte";
  import type { SceneName } from "@/types/";
</script>

<div class="scenes-container">
  <div class="scenes-dropdown-container">
    <label for="scenes-dropdown">Select a Scene: </label>
    <select
      name="scenes"
      bind:value={currentScene.current}
      onchange={(e: Event) => {
        isTransitionRunning.current = true;
      }}
    >
      {#each scenes.current as scene}
        <option value={scene}>{scene}</option>
      {/each}
    </select>
  </div>
  <div class="scenes-properties-container hide">
    <form></form>
  </div>
  <button> Modify Scene Properties </button>
</div>
