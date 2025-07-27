import { calculateMinutesAndSeconds } from "@/utils/";

export const isPaused = $state({ current: true });
export const handlePaused = () => (isPaused.current = !isPaused.current);

export const volume = $state({ current: 1 });
export const setVolume = (newVolume: number) => (volume.current = newVolume);

export const duration = $state({ current: 0 });
export const setDuration = (newDuration: number) => (duration.current = newDuration);

export const currentTime = $state({ current: 0 });
export const setCurrentTime = (newCurrentTime: number) => (currentTime.current = newCurrentTime);

const derivedCurrentTime = $derived(calculateMinutesAndSeconds(currentTime.current));

export const getDerivedCurrentTime = () => derivedCurrentTime;

const derivedTotalDuration = $derived(calculateMinutesAndSeconds(duration.current));

export const getDerivedTotalDuration = () => derivedTotalDuration;
