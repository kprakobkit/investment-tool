const express = require("express");
const fs = require("fs");
const response = fs.readFileSync("./response.json", "utf8");

const app = express();

app.get("/results", function(req, res) {
  res.json(response);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
