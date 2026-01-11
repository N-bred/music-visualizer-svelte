const express = require("express");
const cors = require("cors");
const { parseFile } = require("music-metadata");
const { inspect } = require("node:util");
const fs = require("fs");
const { Innertube, UniversalCache, Utils, Platform } = require("youtubei.js");
const path = require("path");
const ytdl = require("ytdl-core");
const ytapi = require("youtube-search-api");
const app = express();
const PORT = 3001;

Platform.shim.eval = async (data, env) => {
  const properties = [];

  if (env.n) {
    properties.push(`n: exportedVars.nFunction("${env.n}")`);
  }

  if (env.sig) {
    properties.push(`sig: exportedVars.sigFunction("${env.sig}")`);
  }

  const code = `${data.output}\nreturn { ${properties.join(", ")} }`;

  return new Function(code)();
};

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"];

function randomID(artistName, songName) {
  return artistName + " " + songName;
}

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

app.use("/songs", express.static(path.join(__dirname, "songs")));

app.use(express.json());

app.get("/api/localSongs", async (req, res) => {
  const songs = fs.readdirSync(path.join(__dirname, "songs"));
  const metadata = songs
    .map((song) => path.join(__dirname, "songs", song))
    .map(async (songPath, i) => {
      try {
        const { artist, title } = (await parseFile(songPath)).common;
        const src = new URL(path.join(`http://localhost:${PORT}`, "songs", songs[i]));
        return {
          id: randomID(artist, title),
          artistName: artist,
          songName: title,
          fileName: title + songPath.slice(songPath.indexOf(".")),
          src,
        };
      } catch (error) {
        console.error("Error parsing metadata:", error.message);
      }
    });

  res.json({ songs: await Promise.all(metadata) });
});

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

    const innerTube = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true,
    });

    const info = await innerTube.getBasicInfo(id);

    const audioStream = await info.download({ type: "audio" });

    res.setHeader("Content-Type", "audio/mp4");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Range");
    res.setHeader("Accept-Ranges", "bytes");

    for await (const chunk of Utils.streamToIterable(audioStream)) {
      res.write(chunk);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Stream Error " + err.message);
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on port: ${PORT}`);
});
