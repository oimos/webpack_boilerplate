// es5
'use strict';

var webpack = require('webpack');
var path = require('path');
var sass = require('node-sass');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;
var config = {
  module: {
    loaders: [
        {
            test: /\.js$/,
            loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.scss$/,
            // no minificated
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!autoprefixer-loader?browsers=Android >= 2.3!sass-loader?outputStyle=expanded')
            // monified css
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&sourceMap&minimize!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
        },
        {
            test: /\.(png|jpg)$/, loader: 'url-loader?limit=10'
        }

        // {
        //   test: /\.(jpg|png)$/,
        //   // loaders: 'url-loader'
        //   loaders: 'file-loader?name=[name].[ext]'
        // }
    ]
  },
  entry: {
    'index': 'index.js',
  },
  output: {
    path: __dirname,
    publicPath: __dirname,
    filename: './dist/index.js'
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
};

module.exports = config;