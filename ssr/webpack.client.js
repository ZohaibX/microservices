const path = require('path');

//! .babelrc file is a necessary file for this

module.exports = {
  // Tell webpack , the route file of server side
  entry: './src/client/client.tsx',

  // tell webpack, where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  // tell webpack, to apply babel on every file, it runs through
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
