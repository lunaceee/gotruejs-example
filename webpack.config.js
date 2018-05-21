module.exports = {
  mode: "production",
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  devServer: {
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/.netlify/functions": ""
        }
      }
    }
  }
};