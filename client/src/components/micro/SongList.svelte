<script lang="ts">
  import type { Song } from "@/types";
  import { getCurrentSong, handleSelectSong } from "@/store/SongsPanel.svelte";
  import SongItem from "./SongItem.svelte";
  const { songs }: { songs: Song[] } = $props();
</script>

<ul id="song-list">
  {#each songs as song, index}
    <li>
      <SongItem
        active={song.id === getCurrentSong().id}
        {song}
        onclick={(e: Event) => {
          e.preventDefault();
          handleSelectSong(index);
        }}
      />
    </li>
  {/each}
</ul>
