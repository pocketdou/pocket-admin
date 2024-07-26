const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // 假设你想要@代表src目录
      }
    },
    plugins: [
      require('unplugin-vue-components/webpack').default({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-auto-import/webpack').default({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
