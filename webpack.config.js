const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'htmldiff.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'production',
  optimization: {
    minimize: true
  }
};
