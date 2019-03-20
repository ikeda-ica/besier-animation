const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('@babel/polyfill');

module.exports = {
  entry: [
    '@babel/polyfill', './src/js/app.js'
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: ['/node_modules/']
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: {
              url: false
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')({grid: true})]
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname)
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  cache: false,
  optimization: {
    minimize: true,
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/style.css',
      chunkFilename: 'css/[id].css'
    })
  ]
};
