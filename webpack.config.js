const path = require('path')

module.exports = {
  entry: './src/customer/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./', 'dist')
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
  }
}
