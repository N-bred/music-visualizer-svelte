const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const ENVIRONS = process.env.ENVIRONS;
const mainRoute = ENVIRONS ? "/" : "/music-visualizer-svelte";

app.use(mainRoute, express.static(path.join(__dirname, "dist")));

app.get(mainRoute, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on PORT: ${PORT}`);
});
