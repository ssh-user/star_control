// webpack.config.js

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const frontend = {
    entry: {
        bundle: './src/public/js/index.js',
        vendor: ["pixi.js", "pixi-smoothie", "pixi-sound"]
    },
    output: {
        filename: '[name].[hash].js',
        path: __dirname + '/build/public/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    devServer: {
        contentBase: './build/public'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.[hash].js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin('bundle.[hash].css'),
        new HtmlWebpackPlugin({
            template: 'src/public/index.html'
        }),
        new CleanObsoleteChunks(),
        new CopyWebpackPlugin([{
            from: 'assets/',
            to: "assets/"
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        })
    ]
};

const backend = {
    entry: {
        app: './src/server/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build/server/'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["env", {
                                "targets": {
                                    "node": "8" // <--- this
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["./build"]),
        new CopyWebpackPlugin([{
            from: 'package.json'
        },])
    ]
};


module.exports = [
    frontend,
    backend
];
