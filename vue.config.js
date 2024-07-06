const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/country-catalog/' : '/',
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
    compress: true,
    disableHostCheck: true,
  },
  outputDir: 'dist',
  assetsDir: 'static'
});
