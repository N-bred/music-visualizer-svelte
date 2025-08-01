import type { DEFAULT_SCENES } from "@/store/DefaultValues.svelte";
import type { Color, Group, Mesh, BoxGeometry, MeshBasicMaterial, Object3DEventMap } from "three";

type HTMLInputTypes =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export type Schema = {
  id: string;
  localStorageId: string;
  name: string;
  type: HTMLInputTypes;
  order: number;
  required: HTMLInputElement["required"];
  defaultValue: string | number | boolean;
  textContent: string;
  minValue?: string | number;
  maxValue?: string | number;
  eventProvider: (groups: Group[]) => (e: Event) => void;
  eventHandler: (e: Event) => void;
};

export type Song = {
  id: string;
  artistName: string;
  songName: string;
  fileName: string;
  src?: string;
};

export type Theme = {
  name: string;
  color: Color;
  transitionColor: Color;
  backgroundColor: Color;
};

export type State = {
  previousTheme?: Theme;
  isFPSCounterShowing: boolean;
  isUpdating: boolean;
  isAnimationRunning: boolean;
  songList: Song[];
  rotationEnabled: boolean;
  panEnabled: boolean;
  zoomEnabled: boolean;
  sceneIndex: number;
  themeIndex: number;
  numberOfFrequencies: number;
  themes: Theme[];
  currentSong: number;
  volume: number;
  width: number;
  height: number;
  isPlaying: boolean;
  playerProgressBarInterval: number;
  sceneInputProperties: [];
};

export type PersistedValue<T> = { value: T; set: (newValue: T) => { value: T } };

export type PersistedValues = {
  isAnimationRunning: PersistedValue<boolean>;
  rotationEnabled: PersistedValue<boolean>;
  panEnabled: PersistedValue<boolean>;
  zoomEnabled: PersistedValue<boolean>;
  volume: PersistedValue<number>;
  sceneIndex: PersistedValue<number>;
  themeIndex: PersistedValue<number>;
  themes: PersistedValue<Theme[]>;
};

export type Scene = {
  name: string;
};

export type ConstructedFFT = {
  reloadFFT: () => void;
  fft: Uint8Array<ArrayBuffer>;
};

export type SceneNames = typeof DEFAULT_SCENES;
export type SceneName = SceneNames[number];
export type Vector3Return = [x: number, y: number, z: number];
export type SceneProperties = { position: Vector3Return; rotation: Vector3Return }[];
export type SceneDynamicValues = (amplitude: number) => { scale: Vector3Return };

export type SceneExport = {
  dynamicValues: SceneDynamicValues;
  precalculateValues: () => SceneProperties;
};

export type SceneMap = Record<SceneName, SceneExport>;
export type MeshGroup = Group & { children: Mesh<BoxGeometry, MeshBasicMaterial, Object3DEventMap>[] };
