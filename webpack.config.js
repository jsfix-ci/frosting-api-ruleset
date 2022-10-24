/*eslint-disable require-unicode-regexp */

'use strict';
var glob = require('glob');
var path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: glob.sync('./rules/**/*.js*').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
 },{}),
  output: {
    path: path.resolve(__dirname, 'functions'),
    filename: '[name].js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        //eslint-disable-next-line prefer-named-capture-group
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }

      }
    ]
  }
};
