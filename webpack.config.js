const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    proxy: {
      "/": {
        target: "http://localhost:8000",
        bypass: function(req, res, proxyOptions) {
          if (req.path === "/") {
            return "/index.html";
          }
        }
      }
    }
  }
};
