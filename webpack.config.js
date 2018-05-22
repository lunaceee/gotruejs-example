module.exports = {
  mode: "production",
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        }
      }, {
        loader: 'postcss-loader'
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