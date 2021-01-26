require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/curiosity", async (req, res) => {
  try {
    let photos = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=${process.env.API_KEY}`
    ).then((t) => t.json());
    res.send({ photos });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/spirit", async (req, res) => {
  try {
    let photos = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/?api_key=${process.env.API_KEY}`
    ).then((t) => t.json());
    res.send({ photos });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/opportunity", async (req, res) => {
  try {
    let photos = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/?api_key=${process.env.API_KEY}`
    ).then((t) => t.json());
    res.send({ photos });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
