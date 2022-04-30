const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle[chunkhash].js',
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],

});
