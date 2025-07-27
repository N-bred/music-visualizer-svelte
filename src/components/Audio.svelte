<script lang="ts">
  import { onMount } from "svelte";
  import { getCurrentSong, shouldPlayNext } from "@/store/songDataStore.svelte";
  import { FFT, isPaused } from "@/store/State.svelte";
  import { constructFFT } from "@/utils";
  let audioRef: HTMLAudioElement;

  onMount(() => {
    if (!audioRef) return;
    FFT.reload = constructFFT(audioRef, 2048);

    audioRef.oncanplay = () => {
      if (shouldPlayNext.current) {
        setTimeout(() => {
          audioRef.load();
          audioRef.play();
          shouldPlayNext.current = false;
        }, 500);
      }
    };
  });
</script>

<audio id="main-audio" bind:this={audioRef} src={getCurrentSong().src} bind:paused={isPaused.current}></audio>
