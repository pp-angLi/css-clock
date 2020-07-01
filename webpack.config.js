const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devServer: {
    port: '8888',
    hot: true,
    contentBase: './public'
  },
  entry: `${__dirname}/public/index.js`,
  output: {
    path: `${__dirname}/public`,
    filename: `bundle.js`
  },
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.(s|l)?css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.htm(l)?$/,
      use: ['raw-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}