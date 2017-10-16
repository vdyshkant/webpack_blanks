/* jshint node: true */

module.exports = function(){
  return {
      module: {
          rules: [
              { //- yarn add file-loader -D
                  test: /\.(jpg|png|svg)$/,
                  loader: 'file-loader',
                  options: {
                      name: 'images/[name].[ext]'
                  }
              }
          ]
      }
  };
};
