<script lang="ts">
  import { scenePropsRequireUpdate, currentScene } from "@/store/PropertiesPanel.svelte";
  import InputWithLabel from "./micro/InputWithLabel.svelte";
  import sceneMap from "@/scenes/";

  let modifiers = $derived(sceneMap[currentScene.current].modifiers);

  function onChange(e: Event, key: string) {
    const target = e.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    modifiers[key].set(newValue);
    scenePropsRequireUpdate.current = true;
  }
</script>

{#each Object.keys(modifiers) as key}
  <InputWithLabel
    bind:value={modifiers[key].value}
    name={key}
    required
    type={modifiers[key].type}
    labelContent={modifiers[key].label}
    min={modifiers[key].min}
    onChange={(e: Event) => onChange(e, key)}
  />
{/each}
