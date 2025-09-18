import { FFT } from "@/store/State.svelte";
import type { Song, createAndAddSongType } from "@/types";
import { randomID } from "@/utils/";
import { addSong } from "@/store/SongsPanel.svelte";

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

export function createAndAddSong({ artistName, songName, songFile, src }: createAndAddSongType) {
  const newSong: Song = {
    id: randomID(artistName, songName),
    artistName: artistName,
    songName: songName,
    fileName: `${artistName}-${songName}`,
    src: "",
  };

  if (songFile !== null && songFile !== undefined) {
    newSong.fileName = songFile.name;
    newSong.src = URL.createObjectURL(songFile);
  }

  if (src !== null && src !== undefined) {
    newSong.src = src;
  }

  if (newSong.src === "") {
    throw new Error("Invalid Src for song");
  }

  addSong(newSong);
}
