<template>
  <div>
    <MiniFooter>
      <template v-slot:left>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="#">Terms of Use</a></li>
      </template>
      <template v-slot:right>
        © 2021 Ibbil,  All rights reserved
      </template>
    </MiniFooter>
  </div>
</template>
<script>
import MiniFooter from '../../components/core/footer/MiniFooter'
import { APPNAME } from '../../config/pluginInit'
export default {
  name: 'LayoutFooter',
  components: {
    MiniFooter
  },
  mounted () {
  },
  data () {
    return {
      appName: APPNAME
    }
  }
}
</script>
