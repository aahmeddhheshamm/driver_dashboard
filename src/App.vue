<template>
  <div>
    <b-modal id="request-trip" size="lg" centered hide-header hide-footer v-model="openPopupRequest">
      <b-row v-for="(i ,key) in trips" :key="key">
        <b-col lg="2">
          <div class="driver-logo" :style="{
            'background-image': 'url('+ i+')',
            'background-size' : 'cover'

          }"></div>
          <div class="d-flex flex-column">
            <p class="m-0 p-0">آسم العميل</p>
            <h5>{{i.userName}}</h5>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="d-flex flex-column">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">من</p>
              <p>{{i.startAddress}}</p>
            </div>
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">الى</p>
              <p>{{i.endAddress}}</p>
            </div>
          </div>
        </b-col>
        <b-col lg="3">
          <div class="d-flex flex-column">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">المسافة</p>
              <p>20 كيلومتر</p>
            </div>
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">موعد النقل</p>
              <p>{{i.created_at}}</p>
            </div>
          </div>
        </b-col>
        <b-col lg="3">
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex flex-column">
              <p class="p-0 m-0 font-weight-bold">العرض</p>
              <p> {{i.price}} ر.س</p>
            </div>
            <div v-if="status !=='accepted' && status !=='rejected'">
              <div v-if="!loadingButtons">
                <div class="d-flex align-items-center mb-2 justify-content-between">
                  <b-button variant="primary" class="px-3 py-2 ml-1" @click="accept(i)">قبول</b-button>
                  <b-button variant="danger" class="px-3 py-2 mr-1" @click="reject(key)">رفض</b-button>
                </div>
                <b-button v-if="!showPriceInput" variant="outline-primary" class="m-auto px-4 py-2 mt-3 w-100 d-block">
                  <span class="font-size-14" @click="showPriceInput = true">عرض سعر آخر</span>
                </b-button>
                <div class="mt-2" v-else>
                    <b-form>
                      <div class="position-relative">
                        <input-form v-model="price" placeholder="سعر آخر"></input-form>
                        <span class="text-primary font-weight-bold position-absolute sent_button" @click="accept(i)">إرسال</span>
                      </div>
                    </b-form>
                </div>
              </div>
              <div v-else>
                <b-button variant="primary" class="px-3 py-2 ml-1 w-100">
                  <spinner-loading text="انتظار" />
                </b-button>
              </div>
            </div>
            <div v-else class="w-100">
              <div v-if="status === 'accepted'" class="done-box d-flex flex-column align-items-center justify-content-center">
                <i class="las la-check-circle text-white font-size-20"></i>
                <span class="text-white font-size-14 ">تم الموافقة</span>
              </div>
              <div v-if="status === 'rejected'" >
                <div class="refuse-box d-flex flex-column align-items-center justify-content-center">
                  <i class="las la-times-circle text-white font-size-20"></i>
                  <span class="text-white font-size-14 ">تم الرفض</span>
                </div>
                <p class="text-warning p-0 m-0 mt-2 text-decoration-underline text-center" @click="showPriceInput = true ; status = ''">عرض سعر أخر</p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-modal>
    <delete-popup ref="deletePopup" />
    <router-view/>
  </div>
</template>
<script>
import { core } from './config/pluginInit'
import { mapGetters } from 'vuex'
import Bus from '@/eventBus'
import authServices from '@/modules/auth/services/auth'
import tripSErvices from '@/modules/trips/services/trip'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      status: '',
      showPriceInput: false,
      loadingButtons: false,
      trips: [],
      price: '',
      onLine: navigator.onLine,
      showBackOnline: false,
      deletePopup: false,
      listenersStarted: false,
      openPopupRequest: false
    }
  },
  mounted () {
    // console.log('sddsadasdsa => ', process)
    this.startListeners()
    core.mainIndex()
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
    Bus.$on('openDeleteModal', (data) => {
      this.$refs.deletePopup.show(data).then(sucess => {
        console.log(sucess)
      })
    })
  },
  computed: {
    ...mapGetters([''])
  },
  created () {
    if (!JSON.parse(localStorage.getItem('userToken'))) {
      this.$router.push({ name: 'login' })
    }
  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },
  watch: {
    onLine (v) {
      if (v) {
        this.showBackOnline = true
        setTimeout(() => { this.showBackOnline = false }, 1000)
      } else {
        core.showSnackbar('offline', 'You\'re offline. Check your connection.\n')
      }
    }
  },
  methods: {
    updateOnlineStatus (e) {
      const { type } = e
      this.onLine = type === 'online'
    },
    async startListeners () {
      await this.startOnMessageListener()
      await this.startTokenRefreshListener()
      await this.requestPermission()
      await this.getIdToken()
      this.listenersStarted = true
    },
    startOnMessageListener () {
      try {
        this.$messaging.onMessage((payload) => {
          console.log('JSON.parse(payload.notification.body).type => ', payload)
          if (JSON.parse(payload.notification.body).type === 'status') {
            this.loadingButtons = false
            if (JSON.parse(payload.notification.body).accepted) {
              this.status = 'accepted'
            } else {
              this.status = 'rejected'
            }
          } else if (JSON.parse(payload.notification.body).type === 'cancelled') {
            const indexOfTrip = this.trips.findIndex(trip => trip.id === JSON.parse(payload.notification.body).tripRequestId)
            console.log('indexOfTrip => ', indexOfTrip)
            if (indexOfTrip > -1) {
              this.trips.splice(indexOfTrip, 1)
            }
            if (this.trips.length === 0) {
              this.openPopupRequest = false
            }
          } else {
            if (!this.openPopupRequest) {
              this.openPopupRequest = true
            }
            this.trips.unshift(JSON.parse(payload.notification.body))
            this.price = JSON.parse(payload.notification.body).price
          }
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    startTokenRefreshListener () {
      try {
        this.$messaging.onTokenRefresh(async () => {
          try {
            const token = this.$messaging.getToken()
            const res = await authServices.sendFirebase(token)
            localStorage.setItem('fcmToken', res)
          } catch (e) {
            console.error('Error : ', e)
          }
        })
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async requestPermission () {
      try {
        const permission = await Notification.requestPermission()
        console.log(permission)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    async getIdToken () {
      try {
        this.idToken = await this.$messaging.getToken()
        console.log(this.idToken)
        localStorage.setItem('fcmToken', this.idToken)
        const res = await authServices.sendFirebase(this.idToken)
        console.log('res => ', res)
      } catch (e) {
        console.error('Error : ', e)
      }
    },
    accept (item) {
      const obj = {
        driverId: 1,
        tripRequestId: item.id,
        price: this.price
      }
      tripSErvices.acceptTrip(obj).then(res => {
        this.loadingButtons = true
        core.showSnackbar('success', res.data.message)
      })
    },
    reject (key) {
      this.trips.splice(key, 1)
      if (this.trips.length === 0) {
        this.openPopupRequest = false
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.sent_button {
  left: 0;
  top: 10px
}
.profile-div{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  background-size: cover;
}
.profile-div .capture_image{
  width: 100%;
  text-align: center;
  bottom: -1px;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  position: absolute;
  display: block;
  background: #00000094;
}
.upperMenu .nav-link.router-link-exact-active.router-link-active {
  border-bottom: 0 !important;
  background: transparent !important;
  color: var(--iq-primary) !important;
}
#lottie-beil svg {
  transform: translate3d(0px, -3px, 0px) !important;
}
th, td{
  outline: 0 !important;
  white-space: nowrap;
}
@import "assets/scss/style.scss";
.vs--searchable div{
  min-height: 35px !important;
  border-radius: 10px;
}
.cursor-pointer{
  cursor: pointer;
}
.filter .form-control{
  height: 35px;
  line-height: 45px;
  background: transparent;
  border: 1px solid #d7dbda;
  font-size: 13px;
  color: var(--iq-secondary);
  border-radius: 10px;
}
[dir=ltr][mode=dark] .modal-content{
  background-color: #252549 !important;
}
[dir=ltr][mode=dark] .iq-bg-success{
  color: #fff !important;
  background: rgba(51,148,74,0.3) !important;
}
[dir=ltr][mode=dark] .iq-bg-danger{
  background: rgba(241,67,54,0.3)  !important;
  color: #fff !important;
}
ul#__BVID__120__BV_tab_controls_{
  margin: 0 !important;
  padding: 0 !important;
}
button.vs__deselect {
  margin-left: 7px !important;
}
.holdSelection{
  user-select: none;
}
.holdSelection::selection{
  background: none;
}
.holdSelection::-moz-selection{
  background: none;
}
#sidebar-scrollbar{
  border-top: 1px solid #967af32b;
  padding-top: 15px !important;
}
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
.selectedNumber{
  color: var(--iq-white) !important;
  background: var(--iq-primary) !important;
}
.periodNumbers {
  padding: 5px;
  background: transparent;
  border: 1px solid #d7dbda;
  font-size: 14px;
  color: var(--iq-secondary);
  border-radius: 10px;
  background: #92e8cb00;
  display: flex;
  align-items: center;
  justify-content: start;
}
.periodNumbers span {
  cursor: pointer;
  background: #ececec;
  padding: 5px 15px;
  border-radius: 10px;
  margin-right: 10px;
  color: #5b5b5b;
}
[dir=ltr][mode=light] .btn i {
  margin-right: 0 !important;
}
.tabs .nav.nav-tabs {
  margin-bottom: 6px !important;
}
[dir=ltr][mode=light] .accordion-details .list-group-item.active, .border-active{
  transition: all 0.3s ease-in-out;
  background-color: #fff !important;
  color: var(--iq-primary) !important;
  border:1px solid var(--iq-primary) !important;
}
[dir=ltr][mode=light] .iq-accordion.career-style.faq-style .iq-accordion-block{
  border-radius: 0 !important;
}
.cursor-crosshair{
  cursor: crosshair;
}
.h-10 {
  height: 5px;
}
.cursor-not-allowed {
  cursor: not-allowed !important;
}
.primary-color {
  background-color: var(--iq-bg-light-color)
}
.custom-rounded {
  border-top-left-radius: calc(.3rem - 1px);
  border-top-right-radius: calc(.3rem - 1px);
}
.white-space {
  white-space: pre-wrap;
}
.nav-tabs {
  background: #fff !important;
  border-radius: 10px !important;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
ul.nav.nav-tabs::-webkit-scrollbar {
  background: transparent;
  color: transparent;
  height: 0px;
}
[dir=ltr][mode=light] svg {
  overflow: visible !important;
  vertical-align: middle;
}
.nav-link.router-link-exact-active.router-link-active{
  color: var(--iq-primary) !important;
  border-bottom: 3px solid var(--iq-warning) !important;
  font-weight: bold;
}
.activeButton{
  color: #ff5f35;
}
.ranges.col-12.col-md-auto{
  display: none !important;
}
.calendars {
  background: var(--iq-primary) !important;
}
.daterangepicker .calendars-container {
  flex-grow: 1 !important;
}
.text-decoration-underline {
  text-decoration: underline !important;
  cursor: pointer;
}
</style>
