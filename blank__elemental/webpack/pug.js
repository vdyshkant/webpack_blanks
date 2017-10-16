/* jshint node: true */

module.exports = function(){
  return {
      module: {
          rules: [
              { //- yarn add pug pug-loader -D
                  test: /\.pug$/,
                  loader: 'pug-loader',
                  options: {
                      pretty: true
                  }
              }
          ]
      }
  };
};
