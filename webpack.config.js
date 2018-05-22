module.exports = {
  mode: "production",
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
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