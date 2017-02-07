var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var outputFile = 'vue2-editor'
var globalName = 'VueEditor'

var config = require('../package.json')

module.exports = {
  entry: './gh-pages/main.js',
  output: {
    path: './gh-pages/dist',
    publicPath: '/gh-pages/dist/',
    filename: '[name].docs.js'
  },
  // output: {
  //   path: './dist',
  //   filename: outputFile + '.browser.js',
  //   library: globalName,
  //   libraryTarget: 'umd',
  // },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract('css-loader'),
            sass: ExtractTextPlugin.extract('css-loader!sass-loader'),
            scss: ExtractTextPlugin.extract('css-loader!sass-loader'),
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version),
    }),
    new ExtractTextPlugin(outputFile + '.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
}



// npm install webpack-dev-server --save-dev
