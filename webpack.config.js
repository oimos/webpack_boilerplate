// es5
'use strict';

var webpack = require('webpack');
var path = require('path');
var sass = require('node-sass');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

if (env == 'development' || env == null){
  var config = {
    devServer: {
      contentBase: './',
      port: 3000
    },
    devtool: 'source-map',
      module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?sourceMap=inline')
            },
            {
                test: /\.(png|jpg)$/, loader: 'url-loader?limit=10'
            }
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
  }
}


if (env == 'production'){
  var config = {
    devServer: {
      contentBase: './',
      port: 3000
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
            test: /\.js$/,
            loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader','postcss-loader?sourceMap=inline']
        },
        {
            test: /\.(png|jpg)$/, loader: 'url-loader?limit=10'
        }
      ]
    },

    // If you need to use scss
    // module: {
    //   loaders: [
    //       {
    //           test: /\.js$/,
    //           loaders: ['babel-loader?presets[]=react&presets[]=es2015&cacheDirectory'],
    //           exclude: /node_modules/
    //       },
    //       {
    //           test: /\.css$/,
    //           loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader?sourceMap=inline')
    //       },
    //       {
    //           test: /\.scss$/,
    //           loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!autoprefixer-loader?browsers=Android >= 2.3!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
    //       },
    //       {
    //           test: /\.(png|jpg)$/, loader: 'url-loader?limit=10'
    //       }
    //   ]
    // },
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
  }
}

module.exports = config;