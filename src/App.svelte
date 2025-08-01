<script lang="ts">
  import Audio from "@/components/Audio.svelte";
  import Player from "@/panels/Player.svelte";
  import Canvas from "@/panels/Canvas.svelte";
  import TopBar from "@/panels/TopBar.svelte";
  import PropertiesPanel from "@/panels/PropertiesPanel.svelte";
  import SongsPanel from "@/panels/SongsPanel.svelte";
</script>

<Audio />
<TopBar />
<SongsPanel />
<PropertiesPanel />
<Canvas />
<Player />
