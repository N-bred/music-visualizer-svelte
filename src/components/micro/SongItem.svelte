<script lang="ts">
  import type { Song } from "@/types";
  const { song, onclick, active = false }: { song: Song; onclick: (e: Event) => void; active: boolean } = $props();
</script>

<a 
  class={active ? "active" : ""} 
  href={song.src} 
  id={song.id} 
  {onclick}>
  {song.artistName} - {song.songName}
</a>
