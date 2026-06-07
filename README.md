# 🎵 Svelte + Three JS Song Visualizer - V.2

Welcome to the **Three JS Song Visualizer (with Svelte)**, a dynamic and theme-driven audio visualization project now entering its **Version 2** milestone.

The visualizer is designed to work in sync with audio playback, allowing users to manipulate the playback and animation with precision, thanks to an intuitive keyboard command system.

---

## Getting Started

The backend has been ported from Node.js to **Go**, using Go's `embed` package to bundle the built Svelte frontend into a single executable. No Docker, no Node.js, and no separate install steps — just download and run.

1. Download the latest release for your platform from [Releases](https://github.com/N-bred/music-visualizer-svelte/releases).
2. Run the executable.
3. Open [http://localhost:3001](http://localhost:3001) in your browser.

To load local audio files, place them in a `songs` folder next to the executable, or point to a custom folder with the `--songs` flag:

```bash
music-visualizer-svelte --songs /path/to/your/music
```

On Windows, run `music-visualizer-svelte.exe` from the folder where you extracted the release.

---

## NEW RELEASE (07/06/2026):

An improved experience of the visualizer just came out, now with online song search functionality!

Now, when you download the latest release, you will find a new search song button in the songs panel. This lets you look for songs online without a local audio file — just pure streaming.

Check it out: [Releases](https://github.com/N-bred/music-visualizer-svelte/releases/tag/v2.0.0)

## 🚀 Features

- Real-time audio visualization
- Theme support with user-defined color palettes
- Fullscreen and theater display modes
- Play, pause, next song & previous song buttons
- Volume range
- FPS counter
- Persisted settings across sessions (via local storage)
- Release supporting online song search!
- Load songs directly from your filesystem (place audio files in a `songs` folder next to the executable OR or point to a custom folder with the `--songs` flag)

---

## 🎹 Keyboard Shortcuts

> These shortcuts only trigger when **Ctrl + Alt + Meta (Command/Windows)** are held.

| Key                      | Action Description                    |
| ------------------------ | ------------------------------------- |
| `Ctrl + Shift + S`     | Toggle FPS counter display            |
| `Ctrl + Shift + ↑`     | Previous track                        |
| `Ctrl + Shift + ↓`     | Next track                            |
| `Ctrl + Shift + ←`     | Previous track                        |
| `Ctrl + Shift + →`     | Next track                            |
| `Ctrl + Shift + P`     | Toggle play/pause of audio            |
| `Ctrl + Shift + Space` | Toggle play/pause of audio            |
| `Ctrl + Shift + ]`     | Toggle play/pause of the animation    |
| `Ctrl + Shift + O`     | Toggle play/pause of the animation    |
| `Ctrl + Shift + K`     | Pause animation and pause music       |
| `Ctrl + Shift + L`     | Play animation and resume music       |
| `Ctrl + Shift + F`     | Toggle fullscreen mode                |
| `Ctrl + Shift + T`     | Toggle theater mode                   |
| `Ctrl + Shift + N`     | Previous Theme                        |
| `Ctrl + Shift + M`     | Next Theme                            |
| `Ctrl + Shift + H`     | Previous Scene                        |
| `Ctrl + Shift + J`     | Next Scene                            |
| `Ctrl + Shift + ;`     | Previous Theme                        |
| `Ctrl + Shift + '`     | Next Theme                            |
| `Ctrl + Shift + ,`     | Previous Scene                        |
| `Ctrl + Shift + .`     | Next Scene                            |
---

## 🖌 Theme Support

The visualizer supports **custom themes**, allowing users to personalize their viewing experience. These themes influence the color palette of the visualization, including elements like bars, background, and color transitions. Themes are saved and persisted across sessions.

---

## 📦 Version Info

- **Version**: 2.0.0
- **Status**: Second Phase Released
- **Upcoming**: Shader support, more prefabricated scenes, deeper customization for scene properties.

---

Stay tuned for updates and enhancements as I continue to evolve this visual experience.

And thank you for your attention!
