import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import DatePicker from 'vue2-datepicker'
import spinnerLoading from '@/components/spinnerLoading'
import InfiniteLoading from 'vue-infinite-loading'
import vSelect from 'vue-select'
import welcomePage from '@/components/welcomePage'
import Swiper from '@/components/core/slider/Swiper'
import SwiperNav from '@/components/core/slider/SwiperNav'
import SwiperSlide from '@/components/core/slider/SwiperSlide'
import mainTable from '@/components/table/mainTable'
import deletePopup from '@/components/modal/deleteModal'
import DateRangePicker from 'vue2-daterange-picker'
import RoundedModalButton from '@/components/buttons/roundedModalButton'
import cropperImages from '@/components/cropperImages'
// main modal
import mainModal from '@/components/modal/mainModal'
// form Elements
import inputForm from '@/components/formElements/InputForm'
import textareaForm from '@/components/formElements/TextareaForm'
import mainSelect from '@/components/formElements/VSelect'
import flatPickr from 'vue-flatpickr-component'
import SliderThumbs from '@/components/core/slider/sliderThumbs'
import VueCountryCode from 'vue-country-code'
import DashboardPageTitle from '@/components/ibbil/DashboardPageTitle.vue'
Vue.use(VueCountryCode)
Vue.component('SliderThumbs', SliderThumbs)
Vue.component('DashboardPageTitle', DashboardPageTitle)
Vue.component('multiselect', Multiselect)
Vue.component('DatePicker', DatePicker)
Vue.component('spinner-loading', spinnerLoading)
Vue.component('infinite-loading', InfiniteLoading)
Vue.component('v-select', vSelect)
Vue.component('welcome-page', welcomePage)
Vue.component('Swiper', Swiper)
Vue.component('SwiperNav', SwiperNav)
Vue.component('SwiperSlide', SwiperSlide)
Vue.component('DateRangePicker', DateRangePicker)
Vue.component('mainTable', mainTable)
Vue.component('deletePopup', deletePopup)
Vue.component('main-modal', mainModal)
Vue.component('input-form', inputForm)
Vue.component('textarea-form', textareaForm)
Vue.component('main-select', mainSelect)
Vue.component('model-button', RoundedModalButton)
Vue.component('cropper-images', cropperImages)
Vue.component('flat-pickr', flatPickr)
Vue.component('vue-country-code', VueCountryCode)
