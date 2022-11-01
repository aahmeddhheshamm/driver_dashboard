<template>
  <div>
      <b-container class="p-5">
        <p class="text-primary mb-0 font-size-20">{{ vendorInfo.full_name }} ,  كيف حالك ؟</p>
        <h3 class="text-primary font-weight-bold">أهلا بك فى منصة إبل</h3>
        <b-card class="bg-warning text-white iq-border-radius-10 mt-4">
          <p class="m-0 p-0 font-size-18 font-weight-bold">جاري مراجعة البيانات، سيتم التواصل معك فور الانتهاء</p>
        </b-card>
        <div class="d-flex justify-content-center align-items-center mt-5">
          <img :src="require('@/assets/images/error/image-empty.svg')">
        </div>
      </b-container>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import mainInfo from '@/mixins/mainInfo'
export default {
  components: {},
  mixins: [mainInfo],
  mounted () {
    core.index()
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    console.log(this.$store.getters.getStoreStatus)
    if (this.$store.getters.getStoreStatus !== 'processing') {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
