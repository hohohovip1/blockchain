const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = dotenv.config({path: "./env/prod.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    mode: "production",
    entry: {
        loader: ["@babel/polyfill", "./client/react/loader.jsx"]
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),

    },
    resolve: {
        extensions: [".js", ".jsx", ".styl"]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new AsyncChunkNames(),
        new HtmlWebPackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
            minify: {
                removeComments: true,
            }
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: 4,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                },
                vendor: {
                    chunks: 'all',
                    name: "vendor",
                    test: /node_modules/
                }
            }
        }
    },
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
    }
};
