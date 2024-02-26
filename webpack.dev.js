const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    static: './dist',
    port: 9000,
    open: true,
    watchFiles: ['./src', './index.html'],
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
