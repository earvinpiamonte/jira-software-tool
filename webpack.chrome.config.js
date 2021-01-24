/*
  Webpack configuration for transpiling Chrome scripts
*/
var path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./src/chrome/background.js",
    content: "./src/chrome/content.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build/chrome/"),
  },
};