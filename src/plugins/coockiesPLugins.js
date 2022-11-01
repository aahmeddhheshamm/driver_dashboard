import Cookies from 'js-cookie'

const CookiesPlugin = {
  install (Vue, options) {
    Vue.prototype.$Cookies = Cookies
  }
}

export default CookiesPlugin
