import settingServices from '@/modules/settings/services/settings'
export default {
  data () {
    return {
      vendorInfo: {},
      storeActive: {},
      myStores: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      settingServices.getMerchantInfo().then(res => {
        this.myStores = res.data.stores
        const selectedStoreIndex = res.data.stores.findIndex(store => {
          return store.id === res.data.default_store_id
        })
        this.storeActive = res.data.stores[selectedStoreIndex]
        if (this.storeActive.status !== 'completed') {
          if (this.storeActive.status === 'pending') {
            this.$router.push({ name: 'setting' })
            this.$store.commit('changeStoreStatus', 'pending')
            localStorage.setItem('storeStatus', 'pending')
          } else if (this.storeActive.status === 'processing') {
            this.$router.push({ name: 'processing' })
            this.$store.commit('changeStoreStatus', 'processing')
            localStorage.setItem('storeStatus', 'processing')
            localStorage.setItem('vendorActiveStore', JSON.stringify(res.data.stores[selectedStoreIndex]))
          }
        } else {
          localStorage.setItem('vendorActiveStore', JSON.stringify(res.data.stores[selectedStoreIndex]))
          localStorage.setItem('storeStatus', 'completed')
          this.$store.commit('changeStoreStatus', 'completed')
        }
      })
    },
    changeDefaultStore (storeId) {
      settingServices.changeDefaultStore({ default_store_id: storeId }).then(() => {
        this.$router.push({ name: 'index' })
        this.getInfo()
      })
    }
  }
}
