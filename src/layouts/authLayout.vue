<template>
  <b-container>
    <b-row class="justify-content-center my-5">
      <b-col md="6">
        <b-card class="iq-border-radius-20">
          <div class="d-flex justify-content-center">
            <img class="m-auto" :src="require('@/assets/images/ibbil/goldLogo.svg')"  alt="Logo"/>
          </div>
          <transition name="router-anim" :enter-active-class="`animated fadeInUp`" mode="out-in"
                      :leave-active-class="`animated fadeOut`">
            <router-view></router-view>
          </transition>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  mounted () {
    core.index()
  }
}
</script>
