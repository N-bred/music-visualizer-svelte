<script lang="ts">
  import { isPaused, handlePaused, handlePreviousSong, handleNextSong, handleAnimationPaused, isAnimationPaused } from "../store/State.svelte";
</script>

<button onclick={handlePreviousSong}>Previous</button>
<button onclick={handlePaused}>{isPaused.current ? "Play" : "Pause"}</button>
<button onclick={handleNextSong}>Next</button>
<button onclick={handleAnimationPaused}>{isAnimationPaused.current ? "Play" : "Pause"} Animation</button>
