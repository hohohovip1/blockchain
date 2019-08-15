const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const env = dotenv.config({path: "./env/dev.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: {
    loader: ["@babel/polyfill", "./client/react/loader.jsx"]
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: "/",
    path: path.resolve(__dirname, 'build'),

  },
  resolve: {
    extensions: [".js", ".jsx", ".styl"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendor", chunks: "all" }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebPackPlugin({
      title: "hehehe",
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
      minify: {
        removeComments: true,
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map"
};
