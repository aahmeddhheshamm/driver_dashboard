import { singleSignOn } from '@/axios'

export default {
  login (payload) {
    return singleSignOn().post('sso-login', payload)
  },
  checkUser (paylod) {
    return singleSignOn().post('sso-check', paylod)
  }
}
