import CommonApi from '@/services/main'
import { core } from '@/config/pluginInit'
export default {
  data () {
    return {
    }
  },
  methods: {
    checkIfLogin () {
      return this.$Cookies.get('userData') || false
    },
    logout () {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('storeStatus')
      this.$router.push({ name: 'login' })
    },
    showSuccessUploadFile () {
      core.showSnackbar('success', 'File Uploaded Successfully')
    },
    commonUploadFiles (payload, config) {
      return new Promise((resolve, reject) => {
        CommonApi.commonUploadFiles(payload, config)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  },
  created () {
  }
}
