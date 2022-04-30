const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    main: path.resolve(__dirname, 'src', 'index.jsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  performance: {
    hints: false,
  },

  module: {

    rules: [
      {
        test: /\.(js||jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },

      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },

      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },

      {
        test: /\.(png|jpe?g|git)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      // favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      filename: 'index.html',
    }),
    new Dotenv(),
  ],

};
