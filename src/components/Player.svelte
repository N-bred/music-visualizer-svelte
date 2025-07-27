<script lang="ts">
  import { isPaused, handlePaused } from "@/store/State.svelte";
  import { handlePreviousSong, handleNextSong } from "@/store/songDataStore.svelte";
</script>

<div class="player">
  <div class="progress-bar-container">
    <span id="progress-bar-current-time">00:00</span>
    <progress value="0" max="100" id="progress-bar" class="progress-bar">0%</progress>
    <span id="progress-bar-total-duration">00:00</span>
  </div>

  <div class="buttons-menu">
    <button aria-label="button" class="previous-button" onclick={handlePreviousSong}><i class="fa fa-step-backward" aria-hidden="true"></i></button>

    <button aria-label="button" class={isPaused.current ? " play-button" : "pause-button"} onclick={handlePaused}>
      <i class="fa {isPaused.current ? 'fa-play' : 'fa-pause'}" aria-hidden="true"></i>
    </button>

    <button class="next-button" aria-label="button" onclick={handleNextSong}><i class="fa fa-step-forward" aria-hidden="true"></i></button>
  </div>

  <div class="volume-menu">
    <i class="fa fa-volume-down" aria-hidden="true"></i>
    <input type="range" name="volume-button" id="volumen-button" min="0.0" max="1.0" step="0.1" />
    <i class="fa fa-volume-up" aria-hidden="true"></i>
  </div>
</div>
