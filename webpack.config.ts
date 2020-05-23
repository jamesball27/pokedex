import path from 'path';

module.exports = {
  entry: './client/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
};
