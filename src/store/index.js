import Vue from 'vue'
import Vuex from 'vuex'
import Setting from './Setting/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting
  },
  state: {
    storeStatus: localStorage.getItem('storeStatus') || null
  },
  mutations: {
    changeStoreStatus (state, payload) {
      state.storeStatus = payload
    }
  },
  actions: {
  },
  getters: {
    getStoreStatus: state => state.storeStatus
  },
  strict: debug
})
