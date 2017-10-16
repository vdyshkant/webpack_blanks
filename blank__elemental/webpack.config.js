/* jshint node: true */ //- jshint is not aware of node.js globals by default you need to inform it.
'use strict';

const path = require('path'); //- path is a core module, not a global. This mean you need to require it first
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //- yarn add html-webpack-plugin -D

const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');

//- PATHS
const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge(
    {
        entry: { //- ENTRY point
            'index': PATHS.source + '/pages/index/index.js', // << defining page
            'blog': PATHS.source + '/pages/blog/blog.js' // << defining page
        },
        output: { //- OUTPUT point
            'path': PATHS.build,
            'filename': 'js/[name].js'
        },
        // watch: true,
        plugins: [
            new HtmlWebpackPlugin({ //- // yarn add html-webpack-plugin -D
                filename: 'index.html',
                // title: 'new wk:index app',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({ //- // yarn add html-webpack-plugin -D
                filename: 'blog.html',
                // title: 'new wk:blog app',
                chunks: ['blog', 'common'],
                template: PATHS.source + '/pages/blog/blog.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
              name: 'common'
            }),
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery'
            })
        ]
    },
    pug(),
    images()
);



module.exports = function(env){
  if (env === 'production'){
    return merge([
      common,
      extractCSS(),
      uglifyJS()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ]);
  }
};
