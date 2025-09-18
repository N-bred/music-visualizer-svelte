<script lang="ts">
  import { scenes, currentScene, isTransitionRunning, handleSceneSelect } from "@/store/PropertiesPanel.svelte";
  import SceneModifiers from "./SceneModifiers.svelte";

  let showingModifiers = $state(false);

  function handleShowingModifiers() {
    showingModifiers = !showingModifiers;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
  }
</script>

<div class="scenes-container">
  <div class="scenes-dropdown-container {showingModifiers ? 'hide' : ''}">
    <label for="scenes-dropdown">Select a Scene: </label>
    <select name="scenes" value={currentScene()} disabled={isTransitionRunning.current} onchange={handleSceneSelect}>
      {#each scenes.current as scene}
        <option value={scene}>{scene}</option>
      {/each}
    </select>
  </div>
  <div class="scenes-properties-container {showingModifiers ? '' : 'hide'}">
    <form onsubmit={handleSubmit}>
      <SceneModifiers />
    </form>
  </div>
  <button onclick={handleShowingModifiers}>Modify Scene Properties</button>
</div>
