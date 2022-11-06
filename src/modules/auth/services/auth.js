import { singleSignOn, transportation } from '@/axios'

export default {
  login (payload) {
    return singleSignOn().post('sso-login', payload)
  },
  checkUser (paylod) {
    return singleSignOn().post('sso-check', paylod)
  },
  sendFirebase (payload) {
    console.log(transportation)
    return transportation().patch('drivers/3/fcm-token', { fcm_token: payload }) // ::TODO change static user id
  }
}
