const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const envPath = isProd ? "./.env.production" : "./.env";

module.exports = {
  mode: process.env.NODE_ENV,
  target: "web",
  devtool: "source-map",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx"],
  },
  output: {
    clean: true,
    publicPath: "/",
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[id].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new Dotenv({
      path: envPath,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  devServer: {
    port: 3022,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
