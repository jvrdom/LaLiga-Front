const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    https: true,
    host: 'dev.laliga.com',
    historyApiFallback: true,
  },
  entry: './src/js/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.png$/, use: ['url-loader?mimetype=image/png'] },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/html/index.html',
      filename: 'index.html',
    }),
  ],
};
