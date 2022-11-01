<template>
  <div class="position-relative">
    <section ref="allImages" class="allImages">
      <div class="swiper-container gallery-top mb-3 w-100 ">
        <div class="swiper-wrapper w-100">
          <div class="swiper-slide w-100" v-for="(image, key) in images"
               :key="key">
            <div class="swiper-slide-container w-100">
              <img
                  :src="image"
                  class="img-fluid w-100 mx-auto iq-border-radius-5"
                  :alt="image"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image, key) in images"
           :key="key">
        <div class="swiper-slide-container" >
          <img
              :alt="image"
              :src="image"
              class="img-fluid w-100 mx-auto iq-border-radius-5"
          />
        </div>
      </div>
    </div>
  </div>
    </section>
    <section class="loading-images position-absolute w-100 h-170px bg-white top-0 left-0" v-if="loading">
      <spinner-loading text="loading Images" />
    </section>
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller } from 'swiper'
Swiper.use([Navigation, Pagination, Parallax, Autoplay, Thumbs, Controller])
let galleryTop, galleryThumbs
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  methods: {
    init () {
      galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: false,
        slidesPerView: 1,
        centeredSlides: true
      })
      galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 4,
        slideToClickedSlide: true,
        loop: false,
        loopedSlides: 4
      })
      galleryTop.controller.control = galleryThumbs
      galleryThumbs.controller.control = galleryTop
    }
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = true
    setTimeout(() => {
      galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: false,
        slidesPerView: 1,
        centeredSlides: true
      })
      galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 4,
        slideToClickedSlide: true,
        loop: false,
        loopedSlides: 4
      })
      galleryTop.controller.control = galleryThumbs
      galleryThumbs.controller.control = galleryTop
      this.loading = false
    }, 100)
  }
}
</script>
