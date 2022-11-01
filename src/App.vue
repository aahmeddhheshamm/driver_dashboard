<template>
  <div>
    <delete-popup ref="deletePopup" />
    <router-view/>
  </div>
</template>
<script>
import { core } from './config/pluginInit'
import { mapGetters } from 'vuex'
import Bus from '@/eventBus'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      channel: [],
      pusher: null,
      not: '',
      onLine: navigator.onLine,
      showBackOnline: false,
      deletePopup: false
    }
  },
  mounted () {
    console.log('sddsadasdsa => ', process)
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
    /*     getMerchantInfo () {
      settingService.getMerchantInfo().then(res => {
        console.log('resssssssss => ', res)
      })
    }, */
    updateOnlineStatus (e) {
      const { type } = e
      this.onLine = type === 'online'
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
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
</style>
