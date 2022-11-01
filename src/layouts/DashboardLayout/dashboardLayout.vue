<template>
  <div class="dashboard-layout">
    <navbar-dashboard />
    <sidebar-dashboard />
    <div class="dashboard-content-page">
      <transition name="router-anim" :enter-active-class="`animated fadeInUp`" mode="out-in"
                  :leave-active-class="`animated fadeOut`">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NavbarDashboard from './NavbarDashboard.vue'
import SidebarDashboard from './SidebarDashboard.vue'
export default {
  components: { NavbarDashboard, SidebarDashboard },
  data () {
    return {
      rtl: true
    }
  },
  methods: {
    layoutSetting () {
      this.modeChange({ rtl: this.rtlMode })
    },
    ...mapActions({
      modeChange: 'Setting/layoutModeAction'
    })
  },
  watch: {
  },
  mounted () {
    this.layoutSetting(this.$route.name)
    document.body.style.background = 'var(--iq-primary)'
    document.body.dir = 'rtl'
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
  }
}
</script>
<style lang="scss">
@import url("../../assets/css/custom.css");
/*html {
  direction: rtl;
}*/
body {
  overflow-x: hidden;
}
.dashboard-layout {
  .dashboard-content-page {
    overflow-y: scroll;
    height: calc(100vh - 100px);
    padding: 48px 32px;
    margin-top: 100px;
    margin-inline-start: 320px;
    border-top-right-radius: 40px;
    background: #f6f6f6;
    color: #000;
    @media (max-width: 500px) {
      margin-top: 70px;
      margin-inline-start: 0;
      border-radius: 0;
    }
    &:lang(en) {
      border-top-right-radius: 0;
      border-top-left-radius: 40px;
    }
  }
}
</style>
