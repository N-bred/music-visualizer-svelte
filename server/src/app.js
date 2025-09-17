const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
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

app.get("/video/:id", async (req, res) => {
  const videoId = req.params.id;

  try {
    const id = ytdl.getVideoID(videoId);
    ytdl(id).pipe(res);
  } catch (err) {
    res.status(500).send("Stream Error " + err.message);
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on port: ${PORT}`);
});
