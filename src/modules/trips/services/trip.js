import { transportation } from '@/axios'

export default {
  acceptTrip (payload) {
    return transportation().post('driver-offers', payload)
  }
}
