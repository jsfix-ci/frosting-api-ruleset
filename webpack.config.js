/*eslint-disable newline-before-return */
/*eslint-disable padded-blocks */

'use strict';

const glob = require('glob');
const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: glob.sync('./rules/**/*.js*').reduce(function gather(obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
  }, {}),
  output: {
    path: __dirname,
    filename: './build/functions/[name].js',
    libraryTarget: 'commonjs-module'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }

      }
    ]
  }
};