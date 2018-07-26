const express = require("express");

const app = express();

app.get("/hello", function(req, res) {
  res.json({ res: "hello world" });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
