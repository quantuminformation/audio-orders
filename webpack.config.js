const path = require("path");
var WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "chrome-extension")
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "Audio Orders"
      //,suppressSuccess: true
    })
  ]
};
