/* jshint node: true */

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = function(paths){
  return {
      module: {
          rules: [
              {
                  test: /\.scss$/,
                  include: paths,
                  use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                  })
              },
              {
                  test: /\.css$/,
                  include: paths,
                  use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                  })
              }
          ]
      },
      plugins: [
        new ExtractTextPlugin('./css/[name].css'),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer]
            }
        })
      ]
  };
};
