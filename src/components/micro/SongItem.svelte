<script lang="ts">
  import { getCurrentSong, handleSelectSong } from "@/store/songDataStore.svelte";
  const { song, index } = $props();

  function handleClick(e: Event) {
    e.preventDefault();
    handleSelectSong(index);
  }
</script>

<a  class={getCurrentSong().id === song.id ? "active" : ""} 
    href={song.src} 
    id={song.id} 
    onclick={handleClick}>
    {song.artistName} - {song.songName}
</a>
