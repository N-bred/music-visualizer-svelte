<script lang="ts">
  import { songList } from "@/store/SongsPanel.svelte";
  import SongList from "@/components/micro/SongList.svelte";
  import Button from "@/components/micro/Button.svelte";
  import SongUploader from "@/components/SongUploader.svelte";
  import SongSearch from "@/components/SongSearch.svelte";

  let isSearchingSongs = $state(false);
  const handleIsSearchingSongs = () => (isSearchingSongs = !isSearchingSongs);
</script>

<div class="panel-songs">
  <Button type="submit" onClick={handleIsSearchingSongs}>Search Songs</Button>

  <div class="song-list-container">
    <h3>ALL SONGS</h3>
    <span class="divider"></span>
    <SongList songs={songList.current} />
  </div>

  {#if isSearchingSongs}
    <SongSearch />
  {:else}
    <SongUploader />
  {/if}
</div>
