<script lang="ts">
  import InputWithLabel from "@/components/micro/InputWithLabel.svelte";
  import Button from "@/components/micro/Button.svelte";
  import { createAndAddSong } from "@/utils";

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

    try {
      createAndAddSong({
        artistName,
        songName,
        songFile,
      });
    } catch (err) {
      console.error(err);
    }

    (e.target as HTMLFormElement).reset();
    handleShowingUploadPanel();
  };
</script>

<div>
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
