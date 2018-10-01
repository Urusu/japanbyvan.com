const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '../build/',
    filename: '[name].js',
    chunkFilename: '[id].bundle.js'
  }
};