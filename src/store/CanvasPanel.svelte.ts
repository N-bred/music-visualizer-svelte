import Stats from "stats.js";

export const stats = new Stats();
export const isFPSCounterShowing = $state({ current: false });
export const isFullscreen = $state({ current: false });
export const isTheaterMode = $state({ current: false });

export function handleFPSCounter() {
  isFPSCounterShowing.current = !isFPSCounterShowing.current;
}

export function handleFullScreen() {
  if (isFullscreen.current) {
    document.exitFullscreen();
  } else {
    document.querySelector(".canvas-container")?.requestFullscreen();
  }
}

export function handleTheatherMode() {
  isTheaterMode.current = !isTheaterMode.current;
  document.getElementById("app")!.classList.toggle("theater");
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 40);
}
