<script lang="ts">
  import Audio from "@/components/Audio.svelte";
  import Player from "@/panels/Player.svelte";
  import Canvas from "@/panels/Canvas.svelte";
  import TopBar from "@/panels/TopBar.svelte";
  import PropertiesPanel from "@/panels/PropertiesPanel.svelte";
  import SongsPanel from "@/panels/SongsPanel.svelte";
  import MobileMenu from "./panels/MobileMenu.svelte";
  import KeyboardEvents from "./panels/KeyboardEvents.svelte";
  import FpsCounter from "./panels/FPSCounter.svelte";
  import { isFPSCounterShowing } from "./store/CanvasPanel.svelte";
</script>

<Audio />
<TopBar />
<SongsPanel />
<PropertiesPanel />
<Canvas />
<Player />
<MobileMenu />
<KeyboardEvents />

{#if isFPSCounterShowing.current}
  <FpsCounter />
{/if}
