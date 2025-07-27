import { FFT } from "@/store/State.svelte";

export function constructFFT(audio: HTMLAudioElement, fftSize: number) {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = fftSize;
  let frequencyData = new Uint8Array(analyser.frequencyBinCount);
  return () => {
    analyser.getByteFrequencyData(frequencyData);
    FFT.current = [...frequencyData];
  };
}
