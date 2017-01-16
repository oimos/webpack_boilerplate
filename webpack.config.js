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
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            // monified css
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&sourceMap&minimize!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
        }
    ]
  },
  entry: {
    'index': 'index.js',
  },
  output: {
    path: __dirname,
    publicPath: '/styles/',
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