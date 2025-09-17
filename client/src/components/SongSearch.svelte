<script lang="ts">
  import InputWithLabel from "@/components/micro/InputWithLabel.svelte";
  import Button from "@/components/micro/Button.svelte";
  import { createAndAddSong } from "@/utils";
  import type { Song, YoutubeResult } from "@/types";
  import YoutubePreviewerList from "./micro/YoutubePreviewerList.svelte";

  const SEARCH_SONG_API = "http://localhost:3001/api/searchSongs";
  const GET_SONG_API = "http://localhost:3001/api/getSong/";

  const ARTIST_NAME_INPUT = "artistName";
  const SONG_NAME_INPUT = "songName";
  const SONG_FILE_INPUT = "songFile";

  const showingSearchingPanel = $state({ current: false });
  const handleShowingUploadPanel = () => (showingSearchingPanel.current = !showingSearchingPanel.current);
  let artistNameState = $state("");
  let songNameState = $state("");

  let youtubeSearchResults = $state<YoutubeResult[]>([]);

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const artistName = formData.get(ARTIST_NAME_INPUT) as string;
    const songName = formData.get(SONG_NAME_INPUT) as string;

    try {
      const request = await fetch(SEARCH_SONG_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistName,
          songName,
        }),
      });

      youtubeSearchResults = (await request.json()).data;
      artistNameState = artistName;
      songNameState = songName;
    } catch (err) {
      console.error(err);
    }

    (e.target as HTMLFormElement).reset();
    handleShowingUploadPanel();
  };

  const handlePreviewerClick = async (item: YoutubeResult) => {
    try {
      createAndAddSong({
        artistName: artistNameState,
        songName: songNameState,
        src: GET_SONG_API + item.id,
      });
    } catch (err) {
      console.error(err);
    }

    youtubeSearchResults = [];
  };

</script>

<div>
  <div class="song-upload-container {showingSearchingPanel.current ? '' : 'hide'}">
    <form onsubmit={handleFormSubmit}>
      <InputWithLabel labelContent="Artist name" placeholder="Please enter the artist name" name={ARTIST_NAME_INPUT} required={true} type="text" />

      <InputWithLabel labelContent="Song Name" placeholder="Please enter the song name" name={SONG_NAME_INPUT} required={true} type="text" />

      <Button type="submit">Search Song</Button>
    </form>
  </div>

  <YoutubePreviewerList list={youtubeSearchResults} {handlePreviewerClick} />

  <Button onClick={handleShowingUploadPanel}>
    {showingSearchingPanel.current ? "Show all Songs" : "Search song"}
  </Button>
</div>
