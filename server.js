const express = require("express");
const fs = require("fs");
const response = fs.readFileSync("./response.json", "utf8");

const app = express();

app.get("/results", function(req, res) {
  res.set("Content-type", "application/json");
  res.send(response);
});

app.listen(8000, () => console.log("Server started"));
