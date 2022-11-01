<template>
    <div class="login-cover-small" :style="{ 'background-image': 'url(' + coverImage + ')'  }">
      <div class="overlay-cover d-flex flex-column">
            <div class="login-img-logo-small">
              <img :src="require('@/assets/images/ibbil/logo.svg')" alt="ibbil">
            </div>
            <div class="right-login-page-small d-flex flex-column">
              <h4 class="text-white">تسجيل دخول السائقين</h4>
              <ValidationObserver v-slot="{ handleSubmit }" ref="loginForm">
                <b-form class="login-form-content form-top p-4" @submit.prevent="handleSubmit(login)">
                  <div>
                    <input-form
                        class="mb-3 label-color"
                        v-model="userInfo.user"
                        :validate="'required|numeric'"
                        :placeholder ="$t('auth.IdNumber')"
                        :name="$t('auth.IdNumber')"
                        :label="$t('auth.IdNumber')"

                    />
                    <input-form
                        class="mb-3"
                        v-model="userInfo.password"
                        :validate="'required'"
                        :placeholder="$t('auth.password')"
                        :name="$t('auth.password')"
                        type="password"
                        :label="$t('auth.password')"
                    />
                  </div>
                  <b-button class=" d-flex m-auto text-white font-size-20" variant="warning" type="submit" v-if="!loadingLoginButton">
                    <span class="text-white px-5 py-1 font-size-20">{{$t('auth.enterLogin')}} </span>
                  </b-button>
                  <b-button v-else class="d-flex m-auto text-white px-5 py-2" variant="primary" disabled>
                    <spinner-loading text="saving"/>
                  </b-button>
                  <div class="d-flex align-items-center justify-content-center mt-4">
                    <p class="font-size-18 text-white mb-0">نسيت كلمة السر ؟
                      <router-link :to="{name: ''}" class="link-forget-small font-size-18 mr-1">استعيدها الآن</router-link> </p>
                  </div>
                </b-form>
              </ValidationObserver>
            </div>
      </div>
    </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import authService from '../services/auth.js'
export default {
  name: 'smallLogin',
  data () {
    return {
      coverImage: require('@/assets/images/ibbil/images/login-image.png'),
      loadingLoginButton: false,
      userInfo: {
        user: '',
        password: ''
      },
      submitCheckingForm: false,
      showSignUp: false
    }
  },
  mounted () {
    core.index()
  },
  watch: {
    'userInfo.user' () {
      this.submitCheckingForm = false
    }
  },
  methods: {
    login () {
      this.loadingLoginButton = true
      authService.login(this.userInfo).then(res => {
        core.showSnackbar('success', 'hello ' + res.data.data.user.name)
        this.$router.push({ name: 'mainDash' })
      }).finally(() => {
        this.loadingLoginButton = false
      })
    }
  }
}
</script>
<style>
.login-cover-small{
  background-size: cover;
  background-position: center;
  width: 100%;
}
.overlay-cover {
  width: 100%;
  height: 100vh;
  background: transparent linear-gradient(9deg, #2B5842 0%, #35A36E6C 100%)
}
.login-img-logo-small{
  width: 269px;
  height: 68px;
  margin: auto;
}
.login-img-logo-small img{
  width: 100%;
  height: 100%;
}
.right-login-page-small{
  direction: rtl;
  align-items: center;
  margin: auto;
}
.login-form-content{
  width: 350px;
}
.link-forget-small {
  color: #FFD89A !important;
  text-decoration: underline !important;
}
.form-control {
  background-color: #FFFFFF4B !important;
  color: #FFFFFF !important;
  font-size: 18px !important;
}
/*.label-color::placeholder{*/
/*  color: #FFFFFF !important;*/
/*}*/
/*[dir=ltr][mode=light] .d-block {*/
/*  display: block !important;*/
/*  color: #fff !important;*/
/*  font-size: 20px !important;*/
/*}*/
</style>
