<template>
  <div class="iq-sidebar" >
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link :to="homeURL">
        <img :src="logo" v-if="onlyLogo" class="img-fluid" alt="logo">
<!--        <span v-if="onlyLogoText">{{ appName }}</span>-->
      </router-link>
      <div class="iq-menu-bt-sidebar" v-if="toggleButton">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
      </nav>
    </div>
    <div class="logout_nav">
      <div>
        <ul class="m-0 p-0">
          <li class="iq-menu-title cursor-pointer" @click="logout()">
            <a><i class="las la-sign-out-alt"></i> <span>Logout</span></a>
          </li>
        </ul>
      </div>
      <footer>
        © 2021 Coflow, All rights reserved
      </footer>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenu from '../menus/CollapseMenu'
import { APPNAME } from '@/config/pluginInit'
export default {
  name: 'Sidebar',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'dashboard.home-2' }) },
    items: { type: Array },
    logo: { type: String, default: require('../../../assets/images/ibbil/goldLogo.svg') },
    horizontal: { type: Boolean },
    toggleButton: { type: Boolean, default: true },
    logoShow: { type: Boolean, default: true },
    onlyLogo: { type: Boolean, default: false },
    onlyLogoText: { type: Boolean, default: false },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: {
    CollapseMenu
  },
  mounted () {
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    },
    logout () {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('formStep')
      this.$router.push('/')
    }
  },
  data () {
    return {
      appName: APPNAME
    }
  }
}
</script>
