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
    path: path.resolve(__dirname, "./build/"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.chrome.webpack.json",
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },
    ],
  },
};
