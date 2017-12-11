const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/customer/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins:[
    // new UglifyJsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': '"production"',
    //   'process.env.BROWSER': true,
    // }),
    new HtmlWebpackPlugin({
      title: 'Monitor',
      template: 'template.html'
    })
  ]
}
