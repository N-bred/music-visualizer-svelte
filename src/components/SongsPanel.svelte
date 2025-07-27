<div class="panel-songs" data-active="false">
  <div class="song-list-container">
    <h3>ALL SONGS</h3>
    <span class="divider"></span>
    <ul id="song-list"></ul>
  </div>
  <div class="song-upload-container hide">
    <form id="uploadSongForm">
      <label for="artist-input">Artist Name</label>
      <input type="text" name="artist-name" id="artist-input" placeholder="Please enter the artist name" required />
      <label for="song-input">Song Name</label>
      <input type="text" name="song-name" id="song-name-input" placeholder="Please enter the song name" required />
      <label for="song-file-input">Select a song</label>
      <input type="file" name="song-file" id="song-file-input" accept="audio/*" required />
      <button aria-label="button" type="submit">Upload Song</button>
    </form>
  </div>
  <button
    aria-label="button"
    id="panel-song-swap-button"
    data-open="false"
    data-first-panel-text="Show All Songs"
    data-second-panel-text="Upload a Song"
  >
    Upload a Song
  </button>
</div>
