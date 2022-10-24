/*eslint-disable require-unicode-regexp */

'use strict';

const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'inflection-check': './rules/ll/functions/inflection-check.js'
  },
  output: {
    path: __dirname,
    filename: './functions/[name].js',
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
