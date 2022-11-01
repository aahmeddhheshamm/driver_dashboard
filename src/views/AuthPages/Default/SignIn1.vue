<template>
    <div>

    <h1 class="mb-0">Sign in</h1>
    <p>Enter your email address and password to access admin panel.</p>
    <tab-content id="pills-tabContent-1" class="mt-0">
      <tab-content-item :active="true" id="pills-jwt-fill" aria-labelled-by="pills-jwt-tab-fill">
          <sign-in1-form formType="jwt"></sign-in1-form>
      </tab-content-item>
    </tab-content>
      <b-alert :show="true" v-if="errorData.length>0 || errorPhone.length>0" variant="danger" class="bg-white">
        <div class="iq-alert-icon">
          <i class="ri-information-line"></i>
        </div>
        <div class="iq-alert-text">access Denied</div>
      </b-alert>
  </div>
</template>

<script>
import SignIn1Form from './Forms/SignIn1Form'

export default {
  name: 'SignIn1',
  components: { SignIn1Form },
  data: () => ({
    errorData: localStorage.getItem('errorData') || '',
    errorPhone: localStorage.getItem('errorPhone') || ''
  }),
  mounted () {
    const loggedIn = localStorage.getItem('access_token')
    if (loggedIn !== undefined && loggedIn !== null) {
      this.$router.push({ name: 'mini.dashboard.home-2' })
    }
  }
}
</script>
