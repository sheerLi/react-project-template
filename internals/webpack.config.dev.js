const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'development',

  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    path.join(process.cwd(), 'src/index.jsx'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: 'public/index.html',
    }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  // 配置如何显示性能提示 设置hints: false 不提示
  performance: {
    hints: false,
  },
});
