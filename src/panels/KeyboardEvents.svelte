<script lang="ts">
  import { handlePreviousSong, handleNextSong } from "@/store/SongsPanel.svelte";
  import { handlePaused } from "@/store/PlayerPanel.svelte";
  import { handleAnimationPaused, handleNextScene, handleNextTheme, handlePreviousScene, handlePreviousTheme } from "@/store/PropertiesPanel.svelte";
  import { handleFullScreen, handleTheatherMode, handleFPSCounter } from "@/store/CanvasPanel.svelte";

  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.ctrlKey && e.shiftKey) {
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
        case "KeyK":
          handlePaused(true);
          handleAnimationPaused(true);
          break;
        case "KeyL":
          handlePaused(false);
          handleAnimationPaused(false);
          break;
        case "KeyM":
          handleNextTheme();
          break;
        case "KeyN":
          handlePreviousTheme();
          break;
        case "Quote":
          handleNextTheme();
          break;
        case "Semicolon":
          handlePreviousTheme();
          break;
        case "KeyH":
          handlePreviousScene();
          break;
        case "Period":
          handleNextScene();
          break;
        case "Comma":
          handlePreviousScene();
          break;
        case "KeyJ":
          handleNextScene();
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
