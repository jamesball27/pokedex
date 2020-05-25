const path = require('path'); //import path from 'path';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './client/index.tsx',
  optimization: { minimize: true },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('client', 'dist'),
  },
  // plugins: [new BundleAnalyzerPlugin()],
};
