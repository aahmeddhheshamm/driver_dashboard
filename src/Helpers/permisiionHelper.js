/*
import store from '@/store'
*/
import Vue from 'vue'
Vue.prototype.$perHelper = function (permission) {
  // to check permission f  or authenticated user
  return (this.localStorage.getItem('userInfo').indexOf(permission) > -1)
  /* return store.getters.hasPermission(permission) */
}
