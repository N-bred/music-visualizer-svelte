export const songList = $state({ current: ["/public/songs/System of a Down - Forest.mp3", "/public/songs/Therion - Clavicula Nox.mp3"] });

export const songCurrentIndex = $state({ current: 0 });
export const isPaused = $state({ current: true });
export const shouldPlayNext = $state({ current: false });
export const isAnimationPaused = $state({ current: true });
const currentSong = $derived(songList.current[songCurrentIndex.current]);
export const getCurrentSong = () => currentSong;

// FFT

export const FFT = $state<{ current: number[] | null; reload: (() => void) | null }>({ current: null, reload: null });

// Handlers
export const handlePaused = () => (isPaused.current = !isPaused.current);
export const handleAnimationPaused = () => (isAnimationPaused.current = !isAnimationPaused.current);
export const handlePreviousSong = () => {
  const nextSong = songCurrentIndex.current - 1;
  if (nextSong < 0) return;
  songCurrentIndex.current = nextSong;
  shouldPlayNext.current = true;
};
export const handleNextSong = () => {
  const nextSong = songCurrentIndex.current + 1;
  if (nextSong > songList.current.length - 1) return;
  songCurrentIndex.current = nextSong;
  shouldPlayNext.current = true;
};
