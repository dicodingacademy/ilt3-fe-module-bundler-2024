const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Import environment variables
require('dotenv').config({
  path: path.resolve('.env.local'),
});

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GITHUB_TOKEN': JSON.stringify(process.env.GITHUB_TOKEN),
    }),

    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public/',
          to: './',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
};
