export const isAnimationPaused = $state({ current: true });
export const handleAnimationPaused = () => (isAnimationPaused.current = !isAnimationPaused.current);

export const enableRotation = $state({ current: true });
export const handleEnableRotation = () => (enableRotation.current = !enableRotation.current);

export const enablePan = $state({ current: true });
export const handleEnablePan = () => (enablePan.current = !enablePan.current);

export const enableZoom = $state({ current: true });
export const handleEnableZoom = () => (enableZoom.current = !enableZoom.current);
