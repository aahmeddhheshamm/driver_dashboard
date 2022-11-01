import { marketPlace } from '@/axios'

export default {
  uploadMarketplaceFiles (payload) {
    return marketPlace().patch('merchant/stores', payload)
  },
  getMerchantInfo () {
    return marketPlace().get('merchant/info')
  },
  changeDefaultStore (payload) {
    return marketPlace().patch('merchant/change-default-store', payload)
  }
}
