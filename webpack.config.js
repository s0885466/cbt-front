const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const envPath = isProd ? "./.env.production" : "./.env";

const resolvePath = (filePath) => path.resolve(__dirname, filePath);

module.exports = {
  mode: process.env.NODE_ENV,
  target: "web",
  devtool: "source-map",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@components": resolvePath("src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    clean: true,
    publicPath: "/",
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[id].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, envPath),
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
