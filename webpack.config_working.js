// es5
'use strict';

var webpack = require('webpack');
var path = require('path');
var sass = require('node-sass');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;
    module.exports = [
    {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                }, {
                    test: /\.scss$/,
                    // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&sourceMap&minimize!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
                }
                // loader: ExtractTextPlugin.extract('style-loader','css-loader', 'sass-loader')
                // loaders: ['style', 'css', 'sass',]
            ]
        },
        entry: {
            'index': 'index.js',
        },
        output: {
            // path: path.join(__dirname, 'dist/style'),
            path: __dirname,
            publicPath: '/styles/',
            filename: './dist/index.js'
                // path: path.join(__dirname, 'dist'),
                // filename: '[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new ExtractTextPlugin('./dist/style.css', {
                allChunks: true
            })
        ],
        resolve: {
            extensions: ['', '.json', '.js', '.jsx'],
            modulesDirectories: ['node_modules', __dirname]
        }
    },
    {
        module: {
            loaders: [{
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015']
                }
            }]
        },
        entry: {
            app: './index.js',
        },
        output: {
            path: __dirname,
            publicPath: './dist/',
            filename: '.[name].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
        devtool: 'source-map',
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }

]
