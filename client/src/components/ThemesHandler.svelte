<script lang="ts">
  import InputWithLabel from "@/components/micro/InputWithLabel.svelte";
  import {
    themes,
    getCurrentTheme,
    addNewTheme,
    deleteTheme,
    updateTheme,
    setThemeFromIndex,
    handleThemeSelect,
    currentThemeIndex,
  } from "@/store/PropertiesPanel.svelte";
  import { CSS_VARIABLE_NAMES } from "@/store/DefaultValues.svelte";
  import { updateCSSVariables } from "@/utils/";
  import type { Theme } from "@/types";
  import { Color } from "three";

  const COLOR_NAME = "custom-color-name";
  const INITIAL_COLOR = "initial-color";
  const TRANSITION_COLOR = "transition-color";
  const BACKGROUND_COLOR = "background-color";

  let colorNameInput = $state("");
  let initialColorInput = $state("");
  let transitionColorInput = $state("");
  let backgroundColorInput = $state("");

  $effect(() => {
    updateCSSVariables(getCurrentTheme(), CSS_VARIABLE_NAMES);
  });

  const isShowingPanel = $state({ current: false });
  const comesFromAdd = $state({ current: false });
  const lastThemeIndex = $state({ current: 0 });

  function handleShowingPanel() {
    isShowingPanel.current = !isShowingPanel.current;
  }

  function handleAddButton() {
    fillForm();
    handleShowingPanel();
    lastThemeIndex.current = currentThemeIndex.current;

    addNewTheme({
      name: "",
      color: new Color("#000000"),
      transitionColor: new Color("#ffffff"),
      backgroundColor: new Color("#000000"),
    });

    fillForm(getCurrentTheme());
    comesFromAdd.current = true;
  }

  function handleUpdateButton() {
    handleShowingPanel();
    fillForm(getCurrentTheme());
    comesFromAdd.current = false;
  }

  function handleDeleteButton() {
    deleteTheme();
  }

  function handleShowAllButton() {
    if (comesFromAdd.current) {
      deleteTheme();
      setThemeFromIndex(lastThemeIndex.current);
    }
    handleShowingPanel();
  }

  function fillForm(theme?: Theme) {
    colorNameInput = theme?.name || "";
    initialColorInput = "#" + theme?.color.getHexString() || "";
    transitionColorInput = "#" + theme?.transitionColor.getHexString() || "";
    backgroundColorInput = "#" + theme?.backgroundColor.getHexString() || "";
  }

  function handleAddTheme(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const colorName = formData.get(COLOR_NAME) as string;
    const initialColor = formData.get(INITIAL_COLOR) as string;
    const transitionColor = formData.get(TRANSITION_COLOR) as string;
    const backgroundColor = formData.get(BACKGROUND_COLOR) as string;

    const newTheme: Theme = {
      name: colorName,
      color: new Color(initialColor),
      transitionColor: new Color(transitionColor),
      backgroundColor: new Color(backgroundColor),
    };

    updateTheme(newTheme);
    handleShowingPanel();
  }
</script>

<div class="themes-container">
  <div class="themes-dropdown-container {isShowingPanel.current ? 'hide' : ''}">
    <label for="themes-dropdown">Select a Theme: </label>
    <select name="themes" value={getCurrentTheme()} onchange={handleThemeSelect}>
      {#each themes.current as theme}
        <option value={theme}>{theme.name}</option>
      {/each}
    </select>
  </div>
  <div class="custom-theme-form-container {isShowingPanel.current ? '' : 'hide'}">
    <form onsubmit={handleAddTheme}>
      <InputWithLabel
        labelContent="Color Name:"
        type="text"
        name={COLOR_NAME}
        required={true}
        bind:value={colorNameInput}
        onChange={() => {
          getCurrentTheme().name = colorNameInput;
        }}
      />

      <InputWithLabel
        labelContent="Initial Color:"
        type="color"
        name={INITIAL_COLOR}
        required={true}
        bind:value={initialColorInput}
        onChange={() => {
          getCurrentTheme().color = new Color(initialColorInput);
        }}
      />

      <InputWithLabel
        labelContent="Transition Color:"
        type="color"
        name={TRANSITION_COLOR}
        required={true}
        bind:value={transitionColorInput}
        onChange={() => {
          getCurrentTheme().transitionColor = new Color(transitionColorInput);
        }}
      />

      <InputWithLabel
        labelContent="Background Color:"
        type="color"
        name={BACKGROUND_COLOR}
        required={true}
        bind:value={backgroundColorInput}
        onChange={() => {
          getCurrentTheme().backgroundColor = new Color(backgroundColorInput);
        }}
      />

      <button type="submit">{comesFromAdd.current ? "Add" : "Update"} Custom Theme </button>
    </form>
  </div>

  {#if isShowingPanel.current}
    <button onclick={handleShowAllButton}>Show all themes</button>
  {:else}
    <button onclick={handleAddButton}> Add a Theme </button>
    <button onclick={handleUpdateButton}> Update Selected Theme </button>
    <button onclick={handleDeleteButton}>Delete Selected Theme</button>
  {/if}
</div>
