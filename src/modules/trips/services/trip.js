import { transportation } from '@/axios'

export default {
  acceptTrip (payload) {
    return transportation().post('offers', payload)
  }
}
