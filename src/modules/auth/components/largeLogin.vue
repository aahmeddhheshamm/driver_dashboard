<template>
  <div class="main-login-page d-flex">
    <div class="login-cover" :style="{ 'background-image': 'url(' + coverImage + ')'  }">
      <div class="overlay-cover d-flex align-items-center">
        <b-container>
          <div class="d-flex justify-content-center align-items-center">
            <div class="login-img-logo">
              <img :src="require('@/assets/images/ibbil/logo.svg')" alt="ibbil">
            </div>
          </div>
        </b-container>
      </div>
    </div>
    <div class="right-login-page d-flex flex-column">
      <h3 class="text-primary">تسجيل دخول السائقين</h3>
      <ValidationObserver v-slot="{ handleSubmit }" ref="loginForm">
        <b-form class="form-top p-4" @submit.prevent="handleSubmit(login)">
          <div>
            <input-form
                class="mb-3"
                v-model="userInfo.user"
                :validate="'required|numeric'"
                :placeholder="$t('auth.IdNumber')"
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
          <div class="d-flex align-items-center justify-content-center flex-row-reverse mt-4 align-items-center gap_2" >
            <b-button class="text-white font-size-20" variant="primary" type="submit" v-if="!loadingLoginButton">
              <span class="text-white px-5 py-1 font-size-20">{{$t('auth.enterLogin')}} </span>
            </b-button>
            <b-button v-else class=" text-white px-5 py-2" variant="primary" disabled>
              <spinner-loading text="checking"/>
            </b-button>
            <p class="font-size-18 text-primary  mb-0">نسيت كلمة السر ؟
              <router-link :to="{name: ''}" class="link-forget mr-1">استعيدها الآن</router-link>
            </p>
          </div>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import authService from '../services/auth.js'
export default {
  name: 'largeLogin',
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
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('userToken', JSON.stringify(res.data.meta.token))
        this.$router.push('/')
      }).finally(() => {
        this.loadingLoginButton = false
      })
    }
  }
}
</script>
<style>
.main-login-page{
  width: 100%;
  height: 100vh;
}
.login-cover{
  background-size: cover;
  background-position: center;
  width: 50%;
}
.overlay-cover {
  width: 100%;
  height: 100vh;
  background: #3F6854B7 0% 0% no-repeat padding-box;
}
.login-img-logo{
  width: 450px
}
.login-img-logo img{
  width: 100%;
  height: 100%;
}
.right-login-page{
  width: 50%;
  direction: rtl;
  align-items: center;
  margin: auto;
}
.login-form-content{
  width: 500px;
}
.link-forget {
  color: #FFD89A !important;
  font-size: 20px;
  text-decoration: underline !important;
}
.actions{
  margin-right: 60px;
}
.d-block {
  font-size: 20px;
}
.form-control {
  font-size: 18px;
}
.form-control.bg-white{
  color: #000 !important;
}
</style>
