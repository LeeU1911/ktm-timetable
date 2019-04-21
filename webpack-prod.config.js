const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dir = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|sass|less)?$/,
        loader: 'style-loader',
      },
      {
        test: /\.(css|sass|less)?$/,
        loader: 'css-loader',
        options: { sourceMap: true },
        include: Dir.src,
      },
      {
        test: /\.less?$/,
        loader: 'less-loader',
        options: { sourceMap: true },
        include: Dir.src,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin([Dir.build]),
    new ExtractTextPlugin('style.css'),
    // Minify JS
    new UglifyJSPlugin({
      sourceMap: false,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      __LOCAL__: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Komuter KTM Timetable and Schedule',
      hash: true,
      template: `${__dirname}/dist/index.html`,
    }),
  ],
};