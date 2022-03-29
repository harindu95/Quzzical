const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/questions", async (req, res) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    const data = response.data.results;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/submit", (req, res) => {
  let { username, score, time } = req.body;
  console.log("username", username);
  res.send(username);
});

// const res = axios.post("http://localhost:3000/submit", {
//   username: "user",
//   score: 50,
//   time: 40,
// });
