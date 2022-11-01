<template>
  <div :id="id" class="position-relative">
    <slot name="nav" v-if="navTop" />
    <div :class="`swiper-container-${id}`" v-if="tag == 'div'" :dir="rtl ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <slot />
      </div>
      <!-- If we need pagination -->
      <div
          class="swiper-pagination d-flex justify-content-center align-items-center gap-2 py-2 position-absolute w-100"
           v-if="pagination">
        <slot name="pagination" />
      </div>
      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </div>
    <ul :class="`swiper-container-${id}`" v-else-if="tag == 'ul'" :dir="rtl ? 'rtl' : ''">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <slot />
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination" v-if="pagination">
        <slot name="pagination" />
      </div>
      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </ul>
    <slot name="nav" v-if="!navTop" />
  </div>
</template>
<script>
import Swiper, { EffectFade, Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller } from 'swiper'
import { mapGetters } from 'vuex'
import 'swiper/swiper.scss'
Swiper.use([EffectFade, Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller])
let swiper
export default {
  name: 'Swiper',
  props: {
    className: { type: String, default: 'vue-swiper-class' },
    id: { type: String, default: '' },
    options: {
      type: Object,
      default: () => {
        return {
          effect: 'fade',
          centeredSlides: true,
          loop: true,
          slidesPerView: 2,
          spaceBetween: 50,
          autoplay: true,
          breakpoints: {
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 15
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3.5,
              spaceBetween: 30
            }
          },
          // If we need pagination
          pagination: {
            el: '.swiper-pagination'
          },

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        }
      }
    },
    navTop: { type: Boolean, default: false },
    pagination: { type: Boolean, default: false },
    scrollbar: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  data () {
    return {
      swiper: {}
    }
  },
  computed: {
    ...mapGetters({
      rtl: 'Setting/rtlModeState'
    })
  },
  watch: {
    rtl: function (value) {
      this.reInit()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.id) {
        document.querySelector(`.swiper-container-${this.id}`).style.overflow = 'hidden'
      }
      swiper = new Swiper(`.swiper-container-${this.id}`, this.options)
    },
    reInit () {
      swiper.destroy(true, true)
      setTimeout(() => {
        this.init()
      }, 500)
    }
  }
}
</script>

<style scoped>

[dir="rtl"] .swiper-slide {
  text-align: right !important;
  /* Center slide text vertically */
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-box-pack: right !important;
  -ms-flex-pack: right !important;
  -webkit-justify-content: right !important;
  justify-content: right !important;
  -webkit-box-align: right !important;
  -ms-flex-align: right !important;
  -webkit-align-items: right !important;
  align-items: right !important;
}
</style>
