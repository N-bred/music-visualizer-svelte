<script lang="ts">
  import Audio from "@/components/Audio.svelte";
  import Player from "@/panels/Player.svelte";
  import Canvas from "@/panels/Canvas.svelte";
  import TopBar from "@/panels/TopBar.svelte";
  import DataPanel from "@/panels/DataPanel.svelte";
  import SongsPanel from "@/panels/SongsPanel.svelte";
</script>

<Audio />
<TopBar />
<SongsPanel />
<DataPanel />
<Canvas />
<Player />
