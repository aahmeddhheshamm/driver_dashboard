<template>
  <div>
<!--    <dashboard-page-title>
      لوحة تحكم
    </dashboard-page-title>-->
    Hello Dashboard
    <b-modal id="request-trip" size="lg" centered hide-header hide-footer>
      <b-row>
        <b-col lg="2">
          <div class="driver-logo" :style="{
            'background-image': 'url('+ logo+')',
            'background-size' : 'cover'

          }"></div>
          <div class="d-flex flex-column">
            <p class="m-0 p-0">آسم العميل</p>
            <h5>أحمد هشام</h5>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="d-flex flex-column">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">من</p>
              <p>مدينة الصفا - شارع الأم….</p>
            </div>
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">الى</p>
              <p>عشيرة - حي الأقصى</p>
            </div>
          </div>
        </b-col>
        <b-col lg="3  ">
          <div class="d-flex flex-column">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">المسافة</p>
              <p>243 كيلومتر</p>
            </div>
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">موعد النقل</p>
              <p>15 - 4 - 2022</p>
              <p>04:45 PM</p>
            </div>
          </div>
        </b-col>
        <b-col lg="3">
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">العرض</p>
              <p> 1100 ر.س</p>
            </div>
            <div v-if="!agree && !refuse">
              <div class="d-flex align-items-center justify-content-between">
                <b-button variant="primary" class="px-3 py-2 ml-1" @click="accept">قبول</b-button>
                <b-button variant="danger" class="px-3 py-2 mr-1" @click="reject">رفض</b-button>
              </div>
              <div class="d-flex align-items-center mt-2">
                <b-button v-if="!priceInput" variant="outline-primary" class="m-auto px-4 py-2"><span class="font-size-14" @click="addPrice">عرض سعر آخر</span></b-button>
                <div v-else >
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit()">
                      <input-form v-model="price" placeholder="سعر آخر"></input-form>
                    </b-form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
            <div v-if="agree" class="done-box d-flex align-items-center justify-content-center"><span class="text-white font-size-14 ">تم الموافقة</span></div>
            <div v-if="refuse" class="refuse-box d-flex align-items-center justify-content-center"><span class="text-white font-size-14 ">تم الرفض</span></div>
          </div>
        </b-col>
      </b-row>
    </b-modal>
    <p class="text-primary font-size-18 mb-0" @click="$bvModal.show('request-trip')">الاشعار</p>
  </div>
</template>
<script>
/* import DashboardPageTitle from '@/components/ibbil/DashboardPageTitle.vue' DashboardPageTitle */
import { core } from '@/config/pluginInit'
export default {
  name: 'mainDash',
  components: {},
  data () {
    return {
      logo: require('@/assets/images/profile_user.jpg'),
      agree: false,
      refuse: false,
      priceInput: false,
      price: ''
    }
  },
  methods: {
    accept () {
      this.agree = !this.agree
    },
    reject () {
      this.refuse = !this.refuse
    },
    addPrice () {
      this.priceInput = !this.priceInput
    }
  },
  mounted () {
    core.index()
  }
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     if (!vm.checkIfLogin()) {
  //       next({ name: 'login' })
  //     } else next()
  //   })
  // }
}
</script>
<style>
.driver-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: red;
}
.done-box{
  width: 100%;
  height: 80px;
  background-color: var(--iq-success);
}
.refuse-box{
  width: 100%;
  height: 80px;
  background-color: var(--iq-danger);
}
</style>
