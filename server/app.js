const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/api/getSong", (req, res) => {
  const { query } = req.body;
  res.json({
    receivedQuery: query,
  });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`RUNNING on port: ${PORT}`);
});
