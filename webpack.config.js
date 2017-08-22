'use strict'

let path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        filename: '[name].[hash].bundle.js',
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
                    use: "css-loader"
                })
            }, {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }, {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'ng-annotate-loader',
                    options: {
                        ngAnnotate: 'ng-annotate-patched',
                        es6: true,
                        explicitOnly: false
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}