import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './helper'
import './components'
import firebaseMessaging from '@/config/firebase'

Vue.prototype.$messaging = firebaseMessaging
Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
