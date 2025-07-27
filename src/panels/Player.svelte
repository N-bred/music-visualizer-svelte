<script lang="ts">
  import {
    isPaused,
    handlePaused,
    setVolume,
    volume,
    duration,
    currentTime,
    setCurrentTime,
    getDerivedCurrentTime,
    getDerivedTotalDuration,
  } from "@/store/PlayerPanel.svelte";
  import { handlePreviousSong, handleNextSong } from "@/store/SongPanel.svelte";
  import Button from "@/components/micro/Button.svelte";
  import Input from "@/components/micro/Input.svelte";

  function handleVolumeInput(e: Event) {
    const volumeRange = e.target as HTMLInputElement;
    setVolume(parseFloat(volumeRange.value));
  }

  function handleProgressBar(e: MouseEvent) {
    const progressBar = e.target as HTMLProgressElement;
    const { width, left } = progressBar.getBoundingClientRect();
    const mouseX = e.clientX;
    const progressBarClickedPosition = (mouseX - left) / width;
    const specificSecond = progressBarClickedPosition * duration.current;
    setCurrentTime(specificSecond);
  }
</script>

<div class="player">
  <div class="progress-bar-container">
    <span id="progress-bar-current-time">
      {getDerivedCurrentTime().min}:{getDerivedCurrentTime().sec}
    </span>

    <!-- svelte-ignore a11y-no-noninteractive-element-interactions,  a11y-click-events-have-key-events  -->
    <progress
      value={Math.floor((currentTime.current / duration.current) * 100) || 0}
      max="100"
      id="progress-bar"
      class="progress-bar"
      onclick={handleProgressBar}>0%</progress
    >

    <span id="progress-bar-total-duration">
      {getDerivedTotalDuration().min}:{getDerivedTotalDuration().sec}
    </span>
  </div>

  <div class="buttons-menu">
    <Button className="previous-button" onClick={handlePreviousSong}>
      <i class="fa fa-step-backward" aria-hidden="true"></i>
    </Button>

    <Button className={isPaused.current ? " play-button" : "pause-button"} onClick={handlePaused}>
      <i class="fa {isPaused.current ? 'fa-play' : 'fa-pause'}" aria-hidden="true"></i>
    </Button>

    <Button className="next-button" onClick={handleNextSong}>
      <i class="fa fa-step-forward" aria-hidden="true"></i>
    </Button>
  </div>

  <div class="volume-menu">
    {#if volume.current === 0}
      <i class="fa fa-volume-off" aria-hidden="true"></i>
    {:else if volume.current < 0.6}
      <i class="fa fa-volume-down" aria-hidden="true"></i>
    {:else}
      <i class="fa fa-volume-up" aria-hidden="true"></i>
    {/if}

    <Input
      type="range"
      name="volume-button"
      id="volumen-button"
      min={0.0}
      max={1.0}
      step={0.1}
      required={false}
      onInput={handleVolumeInput}
      defaultValue={volume.current.toString()}
    />

    <i class="fa fa-volume-up" aria-hidden="true"></i>
  </div>
</div>
