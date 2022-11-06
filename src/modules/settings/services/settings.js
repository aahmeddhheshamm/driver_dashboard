import { transportation } from '@/axios'

export default {
  uploadMarketplaceFiles (payload) {
    return transportation().patch('merchant/stores', payload)
  },
  getMerchantInfo () {
    return transportation().get('merchant/info')
  },
  changeDefaultStore (payload) {
    return transportation().patch('merchant/change-default-store', payload)
  }
}
