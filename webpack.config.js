'use strict'

let path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack-plugin')
const ZopfliPlugin = require('zopfli-webpack-plugin')


module.exports = {
    entry: {
        vendor: './src/vendor.js',
        app: './src/app.js'
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':ng-src', ':data-ng-src'],
                        minimize: true
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }]
                })
            }, {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }, {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: ["angularjs-annotate"]
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[chunkhash].bundle.css'
        }),
        new PurifyCSS({
            basePath: __dirname,
            paths: [
                "index.html",
                "src/components/*/*.html"
            ],
            purifyOptions: {
                minify: true
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin((chunk) => {
            if (chunk.name) {
                return chunk.name;
            }
            return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'runtime'],
            minChunks: 'Infinityy'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ManifestPlugin(),
        new ZopfliPlugin({
            asset: "[path].gz[query]",
            algorithm: "zopfli",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}