<script lang="ts">
  import type { YoutubeResult } from "@/types";

  const { item, handlePreviewClick }: { item: YoutubeResult; handlePreviewClick: (item: YoutubeResult) => void } = $props();
</script>

<button class="youtube-preview" onclick={() => handlePreviewClick(item)}>
  <div class="youtube-preview-image-container">
    <img src={item.thumbnails[0].url} alt={item.title} />
  </div>

  <div class="youtube-preview-title-container">
    <p>{item.title}</p>
  </div>
</button>
