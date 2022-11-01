<template>
          <component :is="selectedView"></component>
</template>

<script>
import { core } from '@/config/pluginInit'
import largeLogin from '@/modules/auth/components/largeLogin'
import smallLogin from '@/modules/auth/components/smallLogin'
export default {
  name: 'loginPage',
  components: { largeLogin, smallLogin },
  data () {
    return {
      selectedView: 'largeLogin'
    }
  },
  methods: {
    changeWidth () {
      console.log('width', window.innerWidth)
      if (window.innerWidth >= 990) {
        this.selectedView = 'largeLogin'
      } else {
        this.selectedView = 'smallLogin'
      }
    }
  },
  mounted () {
    core.index()
    this.changeWidth()
    window.addEventListener('resize', this.changeWidth)
    document.body.style.background = '#f5f6fa'
    document.body.dir = 'ltr'
  }
}
</script>
<style>
</style>
