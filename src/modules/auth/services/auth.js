import { singleSignOn, transportation } from '@/axios'

export default {
  login (payload) {
    return singleSignOn().post('sso-login', payload)
  },
  checkUser (paylod) {
    return singleSignOn().post('sso-check', paylod)
  },
  sendFirebase (payload) {
    return transportation().patch('drivers/fcm-token', { fcm_token: payload }) // ::TODO change static user id
  }
}
