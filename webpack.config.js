const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devServer: {
<<<<<<< HEAD
    // host: '0.0.0.0', // 同网可访问
    port: '8888',
=======
    host: '0.0.0.0', // 同网可访问
    port: '8889',
>>>>>>> 018d37fdd3611bac2d3798ed2f32077643aff3de
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