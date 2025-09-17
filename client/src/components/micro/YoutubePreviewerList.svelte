<script lang="ts">
  import type { YoutubeResult } from "@/types";
  import YoutubePreview from "./YoutubePreview.svelte";

  const { list, handlePreviewerClick }: { list: YoutubeResult[]; handlePreviewerClick: (item: YoutubeResult) => void } = $props();

  const handlePreviewClick = (item: YoutubeResult) => {
    handlePreviewerClick(item);
  };
</script>

{#if list.length > 0}
  <div class="song-list-container">
    <h3>Previews:</h3>
    <span class="divider"></span>
  </div>

  <div class="youtube-previewer">
    {#each list as item}
      <YoutubePreview {item} {handlePreviewClick} />
    {/each}
  </div>
{/if}
