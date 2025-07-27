<script lang="ts">
  import { onMount } from "svelte";
  import { getCurrentSong, isPaused, shouldPlayNext, FFT } from "../store/State.svelte";
  import { constructFFT } from "../utils";
  let audioRef: HTMLAudioElement;

  onMount(() => {
    if (!audioRef) return;
    FFT.reload = constructFFT(audioRef, 2048);

    audioRef.oncanplay = () => {
      if (shouldPlayNext.current) {
        audioRef.load();
        audioRef.play();
        shouldPlayNext.current = false;
      }
    };
  });
</script>

<audio bind:this={audioRef} src={getCurrentSong()} bind:paused={isPaused.current}></audio>
