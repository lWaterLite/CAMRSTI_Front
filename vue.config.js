const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  filenameHashing: true,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        secure: false,
        changeOrigin: true
      },
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '中国古代冶金耐火材料科技信息数据库'
        return args
      })
  }
})
