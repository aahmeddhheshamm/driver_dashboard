<template>
  <div>
    <dashboard-page-title :showFilter="true" :showSearch="true" :showExportation="true"  @addEvent="$router.push({name: ''})">{{$t('trips.withdrawProcess')}}</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/products'"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
// import productServices from '@/modules/products/services/products'
export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { label: this.$t('trips.tripId'), key: 'featured_image', class: 'text-right', type: 'image' },
        { label: this.$t('trips.withdrawDate'), key: 'created_at', class: 'text-right' },
        { label: this.$t('trips.price'), key: 'quantity', class: 'text-right' },
        { label: this.$t('trips.status'), key: 'status', class: 'text-right', type: 'status' },
        {
          label: this.$t('trips.control'),
          key: 'actions',
          class: 'text-right',
          type: 'actions',
          actions: [
            {
              text: 'view',
              icon: 'ri-eye-fill',
              color: 'primary',
              ifNavigate: true,
              routePath: 'show-product/:id'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>
