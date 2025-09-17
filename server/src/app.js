const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const ytapi = require("youtube-search-api");
const app = express();
const PORT = 3001;

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"];

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.post("/api/searchSongs", async (req, res) => {
  const { artistName, songName } = req.body;
  const data = (await ytapi.GetListByKeyword(`${artistName}+${songName}`, false, 10, {})).items.map((item) => ({
    id: item.id,
    title: item.title,
    thumbnails: item.thumbnail.thumbnails,
  }));

  res.json({ data });
});

app.get("/api/getSong/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const id = ytdl.getVideoID(videoId);
    const info = await ytdl.getInfo(id);
    const audioFormat = ytdl.chooseFormat(info.formats, {
      quality: "highestaudio",
      filter: (f) => f.hasAudio && !f.hasVideo,
    });

    res.setHeader("Content-Type", audioFormat.mimeType || "audio/mp4");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Range");
    res.setHeader("Accept-Ranges", "bytes");

    ytdl(id, { format: audioFormat }).pipe(res);
  } catch (err) {
    res.status(500).send("Stream Error " + err.message);
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on port: ${PORT}`);
});
