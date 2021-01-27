/*
  Webpack configuration for transpiling Chrome scripts
*/
var path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/chrome/background.tsx",
    content: "./src/chrome/content.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build/chrome/"),
  },
};
