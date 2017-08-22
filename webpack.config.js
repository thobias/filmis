const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './index.js',
    vendor: ['react', 'react-dom', 'react-modal']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  context: path.resolve(__dirname, 'src'),
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'react'
              ]
            }
          }
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    })
  ]
};