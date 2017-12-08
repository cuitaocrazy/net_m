const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/customer/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./')
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
    new UglifyJsPlugin()
  ]
}
