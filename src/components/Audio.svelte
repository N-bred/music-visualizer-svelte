<script lang="ts">
  import { onMount } from "svelte";
  import { getCurrentSong, shouldPlayNext } from "@/store/SongPanel.svelte";
  import { isPaused } from "@/store/PlayerPanel.svelte";
  import { constructFFT } from "@/utils";
  import { FFT } from "@/store/State.svelte";
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
