<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form class="mt-4" novalidate @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider vid="email" name="E-mail" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="emailInput">Email address</label>
          <input type="text" :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                 id="emailInput" aria-describedby="emailHelp"
                 v-model="user.username" placeholder="Enter email" required>
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider vid="password" name="Password" rules="required" v-slot="{ errors }">
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <router-link to="/auth/password-reset1" class="float-right">
            Forgot password?
          </router-link>
          <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||user.password.length<8 &&user.password.length>0 ? ' is-invalid' : '')"
                 id="passwordInput"
                 v-model="user.password" placeholder="Password" required/>
          <div class="invalid-feedback">
            <span>{{ errors[0] }}</span>
            <span v-if="user.password">The password must be at least 8 characters. </span>
          </div>
        </div>
      </ValidationProvider>
      <div class="d-inline-block w-100">
        <b-button v-if='loadingButton' class="btn btn-primary float-right w-25  mt-2" variant="primary" disabled>
          <b-spinner small type="grow"></b-spinner>
          checking...
        </b-button>
        <button v-else type="submit" class="btn btn-primary float-right w-25 mt-2" >Sign in</button>
      </div>

        <b-alert :show="true" v-if="errorMessage" variant="danger" class="bg-white">
      <div class="iq-alert-icon">
        <i class="ri-information-line"></i>
      </div>
      <div class="iq-alert-text">{{ errorMessage}}</div>
      </b-alert>

    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'
/*
import { core } from '../../../../config/pluginInit'
*/
const passwordField = document.querySelector('#passwordInput')

// eslint-disable-next-line no-unused-vars
function switchVisibility () {
  if (passwordField.getAttribute('type') === 'password') passwordField.setAttribute('type', 'text')
  else passwordField.setAttribute('type', 'password')
}

export default {
  name: 'SignIn1Form',
  data () {
    return {
      userPassword: '',
      user: {
        username: '',
        password: ''
      },
      loadingButton: false,
      errorMessage: ''
    }
  },
  watch: {
    'userPassword' (value) {
      this.user.password += value.slice(-1)
      /* setTimeout(() => {
        value.slice(0, -1) + '*'
      }, 200) */
    }
  },
  // components: { SocialLoginForm },
  props: ['formType', 'email', 'password'],
  computed: {
    ...mapGetters(
      ['getUserData', 'getAllowMessage']
    )
  },
  methods: {
    onSubmit () {
      this.jwtLogin()
    },

    jwtLogin () {
      this.loadingButton = true
      this.$router.push({ name: 'dashboard.home-2' })

      /* if (this.user.password.length >= 8) {
        this.$store.dispatch('login', this.user).then((data) => {
          this.$store.dispatch('create').then(() => {
            // console.log(data.data.data.user.is_temporary)
            if (data.data.data.user.is_temporary) {
              localStorage.removeItem('errorData')
              localStorage.removeItem('errorPhone')
              this.$router.push({ name: 'dashboard.home-2' })
              this.loadingButton = false
            } else {
              localStorage.removeItem('errorData')
              localStorage.removeItem('errorPhone')
              this.$router.push('/auth/password-reset1')
              this.loadingButton = false
            }
          }).catch(() => {
            this.loadingButton = false
            this.$router.push('/pages/maintenance')
            localStorage.clear()
          })
          /!* this.errorMessage = data *!/
        }).catch(err => {
          core.showSnackbar('error', err.response.data.error)
          // eslint-disable-next-line eqeqeq
          this.errorMessage = err.response.data.error
          this.loadingButton = false
        })
      } */
    }

  }
}
</script>
