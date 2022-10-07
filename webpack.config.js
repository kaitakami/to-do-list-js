const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin
const path = require("path");

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader", "postcss-loader"],
};

const ruleForHtml = {
  test: /\.html$/i,
  loader: "html-loader",
};

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProduction = mode === "production";
  return {
    // entry: './src/index.js',
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js", // Change the filename
      path: path.resolve(__dirname, "build"), // Change the folder name
    },
    module: {
      rules: [ruleForStyles, ruleForHtml],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/index.html" }), // Modify template if necessary
    ],
    devServer: {
      open: true,
    },
  };
};
