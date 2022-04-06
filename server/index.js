const express = require("express");
const app = express();
var cors = require("cors");
const port = 2000;
const axios = require("axios");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Quizzical app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Quizzical Server is running!");
});

app.get("/getLeaderboard/", (req, res) => {
  connection.query(
    "SELECT * FROM player ORDER BY score DESC LIMIT 10",
    (err, results, fields) => {
      if (err) throw err;

      res.send(JSON.parse(JSON.stringify(results)));
    }
  );
});

app.post("/submitScore/", (req, res) => {
  let { username, score } = req.body;
  //console.log("username", username);
  connection.query(
    "INSERT INTO player(username,score) VALUES(?,?)",
    [username, score],
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
  res.send("Username and score stored successfully");
});

app.get("/questions", async (req, res) => {
  console.log("sendin");
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986"
    );
    const data = response.data.results;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
