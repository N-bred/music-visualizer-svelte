<script lang="ts">
  import { handlePreviousSong, handleNextSong } from "@/store/SongsPanel.svelte";
  import { handlePaused } from "@/store/PlayerPanel.svelte";
  import { handleAnimationPaused } from "@/store/PropertiesPanel.svelte";
  import { handleFullScreen, handleTheatherMode, handleFPSCounter } from "@/store/CanvasPanel.svelte";

  window.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.altKey && e.metaKey) {
      switch (e.code) {
        case "KeyS":
          handleFPSCounter();
          break;
        case "ArrowUp":
          handlePreviousSong();
          break;
        case "ArrowDown":
          handleNextSong();
          break;
        case "ArrowLeft":
          handlePreviousSong();
          break;
        case "ArrowRight":
          handleNextSong();
          break;
        case "KeyP":
          handlePaused();
          break;
        case "Space":
          handlePaused();
          break;
        case "BracketRight":
          handleAnimationPaused();
          break;
        case "KeyO":
          handleAnimationPaused();
          break;
        case "KeyL":
          handlePaused(true);
          handleAnimationPaused(true);
          break;
        case "KeyK":
          handlePaused(false);
          handleAnimationPaused(false);
          break;
        case "KeyF":
          handleFullScreen();
          break;
        case "KeyT":
          handleTheatherMode();
          break;
        default:
          break;
      }
    }
  });
</script>
