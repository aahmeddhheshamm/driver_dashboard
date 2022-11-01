<template>
<!--  <div :id="id">
    <slot name="nav" v-if="navTop" />
    <div class="swiper-container" v-if="tag == 'div'" :dir="rtl ? 'rtl' : ''">
      &lt;!&ndash; Additional required wrapper &ndash;&gt;
      <div class="swiper-wrapper">
        &lt;!&ndash; Slides &ndash;&gt;
        <slot />
      </div>
      &lt;!&ndash; If we need pagination &ndash;&gt;
      <div class="swiper-pagination" v-if="pagination">
        <slot name="pagination" />
      </div>
      &lt;!&ndash; If we need scrollbar &ndash;&gt;
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </div>
    <ul class="swiper-container" v-else-if="tag == 'ul'" :dir="rtl ? 'rtl' : ''">
      &lt;!&ndash; Additional required wrapper &ndash;&gt;
      <div class="swiper-wrapper">
        &lt;!&ndash; Slides &ndash;&gt;
        <slot />
      </div>
      &lt;!&ndash; If we need pagination &ndash;&gt;
      <div class="swiper-pagination" v-if="pagination">
        <slot name="pagination" />
      </div>
      &lt;!&ndash; If we need scrollbar &ndash;&gt;
      <div class="swiper-scrollbar" v-if="scrollbar">
        <slot name="scrollbar" />
      </div>
    </ul>
    <slot name="nav" v-if="!navTop" />
  </div>-->
  <div>
    <swiper
        :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
        :spaceBetween="10"
        :navigation="true"
        class="mySwiper2"
    >
      <swiper-slide
      ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
    ><swiper-slide
    ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
    /></swiper-slide>
    </swiper>
    <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        class="mySwiper"
    >
      <swiper-slide
      ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
    ><swiper-slide
    ><img
        src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
    ><swiper-slide
    ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
    /></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller } from 'swiper'
import { mapGetters } from 'vuex'
import 'swiper/swiper.scss'
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller])
let swiper
export default {
  name: 'Swiper',
  props: {
    className: { type: String, default: 'vue-swiper-class' },
    id: { type: String, default: 'vue-swiper-id' },
    options: {
      type: Object,
      default: () => {
        return {
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
      swiper: {},
      thumbsSwiper: null
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
      swiper = new Swiper('.swiper-container', this.options)
    },
    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
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
