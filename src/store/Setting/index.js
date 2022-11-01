import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  lang: { title: 'العربية', value: 'ar', image: require('../../assets/images/ibbil/Flag_of_Saudi_Arabia.png'), rtl: true },
  langOption: [
    { title: 'العربية', value: 'ar', image: require('../../assets/images/ibbil/Flag_of_Saudi_Arabia.png'), rtl: true },
    { title: 'English', value: 'en', image: require('../../assets/images/ibbil/Flag_of_the_United_Kingdom.png'), rtl: false }
  ],
  activePage: {
    name: 'Dashboard'
  },
  layoutMode: {
    dark: false,
    rtl: true,
    sidebar: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
