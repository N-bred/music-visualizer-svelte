export const isPaused = $state({ current: true });
export const handlePaused = () => (isPaused.current = !isPaused.current);
