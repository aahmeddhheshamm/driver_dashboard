<template>
  <div class="mobile-nav">
    <div class="bg-primary">
      <b-container>
        <div
          class="d-flex py-3 justify-content-between align-items-center gap_1"
        >
          <!-- Logo -->
          <b-img
            class="ibbilLogo"
            :src="require('@/assets/images/ibbil/logo.svg')"
          ></b-img>

          <!-- burger button -->
          <button
            class="bg-transparent text-warning border-0"
            @click="sideNav = true"
          >
            <i class="las la-bars la-2x"></i>
          </button>

          <!-- Side Nav -->
          <side-nav :listItems="listItems" :sideNav="sideNav" @close="sideNav = false" />
        </div>
      </b-container>
    </div>
    <bottom-bar />
  </div>
</template>

<script>
import SideNav from './SideNav.vue'
import BottomBar from './BottomBar.vue'
export default {
  props: ['listItems'],
  components: { SideNav, BottomBar },
  data () {
    return {
      sideNav: false
    }
  }
}
</script>
