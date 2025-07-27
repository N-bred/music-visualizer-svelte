<script lang="ts">
  import SongItem from "./SongItem.svelte";
  const { songs } = $props();
</script>

<ul id="song-list">
  {#each songs as song, index}
    <li>
      <SongItem {song} {index} />
    </li>
  {/each}
</ul>
