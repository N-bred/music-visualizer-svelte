const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on PORT: ${PORT}`);
});
