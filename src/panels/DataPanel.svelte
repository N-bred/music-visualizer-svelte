<script lang="ts">
  import { handleAnimationPaused, isAnimationPaused, enablePan, enableRotation, enableZoom } from "@/store/PropertiesPanel.svelte";
  import CheckboxWithLabel from "@/components/micro/CheckboxWithLabel.svelte";
</script>

<div class="panel-data" data-active="false">
  <div class="properties-container">
    <div class="scenes-container">
      <div class="scenes-dropdown-container">
        <label for="scenes-dropdown">Select a Scene: </label>
        <select name="themes" id="scenes-dropdown"></select>
      </div>
      <div class="scenes-properties-container hide">
        <form id="scene-properties-form"></form>
      </div>
      <button
        id="scenes-properties-button"
        data-open="false"
        data-first-panel-text="Show all Scenes"
        data-second-panel-text="Modify Scene Properties"
      >
        Modify Scene Properties
      </button>
    </div>

    <span class="divider"></span>
    <div class="themes-container">
      <div class="themes-dropdown-container">
        <label for="themes-dropdown">Select a Theme: </label>
        <select name="themes" id="themes-dropdown"></select>
      </div>
      <div class="custom-theme-form-container hide">
        <form id="custom-theme-form">
          <label for="custom-color-name">Color Name: </label>
          <input type="text" name="custom-color-name" id="custom-color-name" required />
          <label for="initial-color-input">Initial Color: </label>
          <input type="color" name="initial-color" id="initial-color-input" required />
          <label for="transition-color-input">Transition Color: </label>
          <input type="color" name="transition-color" id="transition-color-input" required />
          <label for="background-color-input">Background Color: </label>
          <input type="color" name="background-color" id="background-color-input" required />
          <button id="custom-theme-form-button" type="submit" data-add-text="Add Custom Theme" data-update-text="Update Custom Theme">
            Add Custom Theme
          </button>
        </form>
      </div>
      <button id="custom-themes-add-button" data-open="false" data-first-panel-text="Show all Themes" data-second-panel-text="Add a Theme">
        Add a Theme
      </button>
      <button
        id="custom-themes-update-button"
        data-open="false"
        data-first-panel-text="Show all Themes"
        data-second-panel-text="Update Selected Theme"
      >
        Update Selected Theme
      </button>
      <button id="custom-themes-delete-button">Delete Selected Theme</button>
    </div>
    <span class="divider"></span>

    <CheckboxWithLabel bind:checked={isAnimationPaused.current} name="enable-animation" labelContent="Disable Animation?" />

    <CheckboxWithLabel bind:checked={enableRotation.current} name="enable-rotation" labelContent="Enable camera rotation?" />

    <CheckboxWithLabel bind:checked={enablePan.current} name="enable-pan" labelContent="Enable camera pan?" />

    <CheckboxWithLabel bind:checked={enableZoom.current} name="enable-zoom" labelContent="Enable camera zoom?" />
  </div>
</div>
