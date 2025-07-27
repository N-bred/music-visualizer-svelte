<script lang="ts">
  import Player from "./lib/Player.svelte";
  import Audio from "./lib/Audio.svelte";
  import Canvas from "./lib/Canvas.svelte";
</script>

<Audio />
<div class="top-bar">Nicolas Caballero @ 2025</div>
<div class="panel-songs"></div>
<div class="panel-data"></div>
<div class="canvas-container">
  <Canvas />
  <div class="canvas-buttons">
    <button aria-label="button" class="canvas-theater-button" title="Theater Mode"><i class="fa fa-television" aria-hidden="true"></i></button>
    <button aria-label="button" class="canvas-fullscreen-button" title="Fullscreen"><i class="fa fa-square-o" aria-hidden="true"></i></button>
  </div>
</div>
<div class="player">
  <Player />
</div>
