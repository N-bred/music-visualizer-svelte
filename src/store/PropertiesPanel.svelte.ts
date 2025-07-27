export const isAnimationPaused = $state({ current: true });
export const handleAnimationPaused = () => (isAnimationPaused.current = !isAnimationPaused.current);
