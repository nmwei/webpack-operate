const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js' 
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    open: true, //浏览器自动打开
    port: 9000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8880'
        //访问hocalhost:9000/api:*时，会被代理到hocalhost:8880/api:*
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/, 
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', "stage-0"],
          plugins: ["transform-decorators-legacy"]
        }
      }
    }]
  }
}