<template>
  <div>
    <h1 class="mb-0">Change Password</h1>
    <p>You should change password before enter this system.</p>
    <form class="mt-4" @submit.prevent="changePassword">
      <div class="form-group">
        <ValidationProvider vid="oldPassword" name="oldPassword" rules="required" v-slot="{ errors }">
          <div class="form-group">
            <label for="oldPasswordInput">Old Password</label>
            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.old_password.length<8 &&resetPassword.old_password.length>0 ? ' is-invalid' : '')"
                   id="oldPasswordInput"
                   v-model="resetPassword.old_password" placeholder="old password" required>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
              <span v-if="resetPassword.old_password.length">The password must be at least 8 characters. </span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider vid="newPassword" name="newPassword" rules="required" v-slot="{ errors }">
          <div class="form-group">
            <label for="newPasswordInput">New Password</label>
            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.password.length<8 &&resetPassword.password.length>0 ? ' is-invalid' : '')"
                   id="newPasswordInput"
                   v-model="resetPassword.password" placeholder="new password" required>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
              <span v-if="resetPassword.password.length">The password must be at least 8 characters. </span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider vid="confirmPassword" name="confirmPassword" rules="'required|confirmed:newPassword'" v-slot="{ errors }">
          <div class="form-group">
            <label for="confirmPasswordInput">Confirm Password</label>
            <input type="password"  :class="'form-control mb-0' +(errors.length > 0 ||resetPassword.password_confirm.length<8 &&resetPassword.password_confirm.length>0 ? ' is-invalid' : '')"
                   id="confirmPasswordInput"
                   v-model="resetPassword.password_confirm" placeholder="confirm password" required>
            <div class="invalid-feedback">
              <span>{{ errors[0] }}</span>
              <span v-if="resetPassword.password_confirm.length">The password must be at least 8 characters. </span>
            </div>
          </div>
        </ValidationProvider>
      </div>
      <div class="d-inline-block w-100">
        <button type="submit" class="btn btn-primary float-right">Reset Password</button>
      </div>
    </form>
  </div>
</template>
<script>
import { core } from '../../../config/pluginInit'

export default {
  name: 'RecoverPassword1',
  data () {
    return {
      resetPassword: {
        old_password: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    changePassword () {
      this.$store.dispatch('changePassword', this.resetPassword).then(data => {
        core.showSnackbar('success', 'User has been Edit successfully.')
        this.$store.dispatch('logout').then(() => {
          localStorage.removeItem('user_info')
          localStorage.removeItem('auth_permissions')
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_permissions')
          localStorage.removeItem('user_roles')
          localStorage.removeItem('user_projects')
          this.$router.push({ name: 'auth1.sign-in1' })
        })
      }).catch(() => {})
    }
  }

}
</script>
