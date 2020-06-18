const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ResolveEntryModulesPlugin = require('resolve-entry-modules-webpack-plugin');

module.exports = env => ({
  entry: {
    app: ['./src/app/main.js'],
    engine: ['./src/engine/main.js'],
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/shared/'), 'node_modules/']
  },
  devtool: env.NODE_ENV == 'development' ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyPlugin([
      {
        from: './public/',
        to: './',
        ignore: ['index.html']
      },
    ]),
    new ResolveEntryModulesPlugin(),
  ]
});
