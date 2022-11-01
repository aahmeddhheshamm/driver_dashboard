const webpack = require('webpack')
module.exports = {
  publicPath: '/',
  devServer: {
    proxy: 'http://localhost:8000/',
    historyApiFallback: {
      disableDotRule: true
    }
  },
  configureWebpack: {
    devServer: {
      proxy: 'http://localhost:8000/',
      historyApiFallback: {
        disableDotRule: true
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.common.js'
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ar',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
