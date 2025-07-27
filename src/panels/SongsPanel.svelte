<script lang="ts">
  import type { Song } from "@/types";
  import { randomID } from "@/utils/";
  import { songList, addSong } from "@/store/SongPanel.svelte";
  import SongList from "@/components/micro/SongList.svelte";
  import InputWithLabel from "@/components/micro/InputWithLabel.svelte";
  import Button from "@/components/micro/Button.svelte";

  const ARTIST_NAME_INPUT = "artistName";
  const SONG_NAME_INPUT = "songName";
  const SONG_FILE_INPUT = "songFile";

  const showingUploadPanel = $state({ current: false });
  const handleShowingUploadPanel = () => (showingUploadPanel.current = !showingUploadPanel.current);

  const handleFormSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const artistName = formData.get(ARTIST_NAME_INPUT) as string;
    const songName = formData.get(SONG_NAME_INPUT) as string;
    const songFile = formData.get(SONG_FILE_INPUT) as File;

    const newSong: Song = {
      id: randomID(artistName, songName),
      artistName: artistName,
      fileName: songFile.name,
      songName: songName,
      src: URL.createObjectURL(songFile),
    };

    addSong(newSong);
    (e.target as HTMLFormElement).reset();
    handleShowingUploadPanel();
  };
</script>

<div class="panel-songs">
  <div class="song-list-container">
    <h3>ALL SONGS</h3>
    <span class="divider"></span>
    <SongList songs={songList.current} />
  </div>
  <div class="song-upload-container {showingUploadPanel.current ? '' : 'hide'}">
    <form onsubmit={handleFormSubmit}>
      <InputWithLabel labelContent="Artist name" placeholder="Please enter the artist name" name={ARTIST_NAME_INPUT} required={true} type="text" />

      <InputWithLabel labelContent="Song Name" placeholder="Please enter the song name" name={SONG_NAME_INPUT} required={true} type="text" />

      <InputWithLabel labelContent="Select a song" name={SONG_FILE_INPUT} required={true} type="file" accept="audio/*" />

      <Button type="submit">Upload Song</Button>
    </form>
  </div>
  <Button onClick={handleShowingUploadPanel}>
    {showingUploadPanel.current ? "Show all Songs" : "Upload a song"}
  </Button>
</div>
