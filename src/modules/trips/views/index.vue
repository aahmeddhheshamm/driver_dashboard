<template>
  <div>
    <dashboard-page-title :showAddBtn="false" :showFilter="true" :showSearch="true" :showExportation="true">{{$t('trips.trips')}}</dashboard-page-title>
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
        { label: this.$t('trips.pickUp'), key: 'name', class: 'text-right' },
        { label: this.$t('trips.pickIn'), key: 'product_images', class: 'text-right', type: 'multi_image' },
        { label: this.$t('trips.capacityNumber'), key: 'price', class: 'text-right' },
        { label: this.$t('trips.tripPrice'), key: 'quantity', class: 'text-right' },
        { label: this.$t('trips.date'), key: 'created_at', class: 'text-right' },
        // { label: this.$t('products.date'), key: 'created_at', class: 'text-right' },
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
