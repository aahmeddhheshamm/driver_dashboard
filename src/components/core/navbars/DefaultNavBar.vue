<template>
  <!-- TOP Nav Bar -->
  <div class="iq-top-navbar">
    <div class="iq-navbar-custom" :class="horizontal ? 'd-flex align-items-center justify-content-between' : ''">
      <div class="iq-sidebar-logo">
        <div class="top-logo">
          <router-link :to="homeURL">
            <img :src="logo" class="img-fluid" alt="logo">
            <span>{{ appName }}</span>
          </router-link>
        </div>
      </div>
      <div class="iq-menu-horizontal" v-if="horizontal">
        <div class="iq-sidebar-menu">
          <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle" class="collapse-menu"/>
          <HoverMenu :items="items" :sidebarGroupTitle="sidebarGroupTitle" class="hover-menu" />
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light p-0" >
        <div class="navbar-left" v-if="!horizontal">
          <ul class="d-flex p-0 m-0 align-items-center" v-if="!ifSearch">
            <li v-for="(item, index) in bookmark" :key="index" class="upperMenu d-none d-lg-block">
              <router-link :to="item.link" class="nav-link" style="color: var(--iq-primary)" exact>
                <i :class="`${item.icon}`" class="font-size-22"></i>
              </router-link>
            </li>
            <li class="upperMenu d-block d-lg-none cursor-pointer "  v-if="$route.meta.layout !== 'two-sidebar'" @click="miniSidebar">
              <a class="nav-link" style="color: var(--iq-primary)">
                <i class="las la-bars font-size-22" ></i>
              </a>
            </li>
          </ul>
          <div class="mt-0 iq-search-bar" v-if="ifSearch">
            <form action="#" class="searchbox">
              <input type="text" class="text search-input" style="cursor: pointer" ref='inputData' id="inputData" autofocus
                     @input="filterBox"
                     @click="openSearch" v-model="search"
                     placeholder="Type here to search...">
              <a class="search-link" href="#"><i class="ri-search-line"></i></a>
              <GlobalSearch :Alldata="Alldata" :search="search" @closeSearch="removeClass"/>
            </form>
          </div>
        </div>
<!--        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" >
            <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
          </div>
        </div>-->
          <slot name="responsiveRight"/>
          <slot name="right"/>
      </nav>
    </div>
  </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import { APPNAME } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'
import HoverMenu from '../menus/HoverMenu'
import GlobalSearch from '../search/GlobalSearch'
import CollapseMenu from '../menus/CollapseMenu'
export default {
  name: 'DefaultNavBar',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'dashboard.home-1' }) },
    logo: { type: String, default: require('../../../assets/images/ibbil/goldLogo.svg') },
    horizontal: { type: Boolean, default: false },
    items: { type: Array },
    sidebarGroupTitle: { type: Boolean, default: true },
    ifSearch: { type: Boolean }
  },
  mounted () {
    if (!this.horizontal) {
      document.addEventListener('click', this.closeSearch, true)
    }
    this.showSearch = true
    this.showMenu = 'iq-show'
  },
  watch: {
  },
  components: {
    HoverMenu,
    CollapseMenu,
    GlobalSearch
  },
  computed: {
    ...mapGetters({
      bookmark: 'Setting/bookmarkState'
    })
  },
  data () {
    return {
      appName: APPNAME,
      search: '',
      showSearch: false,
      showMenu: false,
      Alldata: []
    }
  },
  methods: {
    filterBox () {
      this.Alldata = ''
    },
    miniSidebar () {
      this.$emit('toggle')
    },
    openSearch () {
      this.showSearch = true
      this.showMenu = 'iq-show'
      if (document.getElementById('searchbox-datalink') !== null) {
        document.getElementById('searchbox-datalink').classList.add('show-data')
      }
    },
    closeSearch (event) {
      const classList = event.target.classList
      if (!classList.contains('searchbox') && !classList.contains('search-input')) {
        this.removeClass()
      }
    },
    removeClass () {
      this.showSearch = false
      this.showMenu = ''
      this.search = ''
      if (document.getElementById('searchbox-datalink') !== null && document.getElementById('searchbox-datalink') !== undefined) {
        document.getElementById('searchbox-datalink').classList.remove('show-data')
      }
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .collapse-menu{
    @media (min-width:1300px) {
      display: none;
    }
  }
  .iq-sidebar-menu .iq-menu.hover-menu{
    display: flex;
    @media (max-width:1299px){
      display: none !important;
    }
  }
</style>
