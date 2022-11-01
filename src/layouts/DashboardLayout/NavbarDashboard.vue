<template>
  <nav class="d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center notfiy-container">
      <div class="user-notify position-relative">
        <i class="lar la-bell"></i>
        <div class="notify-badge">+99</div>
      </div>
      <div class="search-container">
        <i class="las la-search"></i>
        <input
            class="bg-transparent border-0"
            type="text"
            placeholder="ابحث فى لوحة التحكم..."
        />
      </div>
    </div>
    <div class="d-flex align-items-center gap_2">
      <b-dropdown id="dropdown-lang-toggle" class="m-md-2 dropdown-lang-toggle" no-caret :right="selectedLang.value === 'ar' ? true : false">
        <template #button-content>
          <a
              class="language-title d-flex align-items-center gap_1"
              href="#"
          >
            <img
                :src="selectedLang.image"
                alt="img-flaf"
                class="img-fluid mr-1"
                style="height: 16px; width: 16px;"
            />
            <span class="text">{{selectedLang.value === "ar" ? "العربية" : selectedLang.title}}</span>
            <i class="ri-arrow-down-s-line icon"></i>
          </a>
        </template>
        <b-dropdown-item
            v-for="(lang, i) in langsOptions"
            :key="`Lang${i}`"
            @click="changeLanguage(lang.value, lang)"
        >
          <img :src="lang.image" alt="img-flaf" class="img-fluid mr-2 dropdwon-lang-item-img" />
          <span class="dropdwon-lang-item-title">{{ lang.title }}</span>
        </b-dropdown-item>
      </b-dropdown>
      <div class="logo">
        <img src="@/assets/images/ibbil/goldLogo.svg" width="180px" alt="" />
      </div>
    </div>
    <div class="mobile-icons-wrapper align-items-center">
      <div class="user-notify position-relative">
        <i class="lar la-bell"></i>
        <div class="notify-badge">+99</div>
      </div>
      <div class="search-icon">
        <i class="las la-search"></i>
      </div>
      <div class="burger-icon" @click="toggleSidebar()">
        <i :class="sidebar ? 'las la-times' : 'las la-bars'"></i>
      </div>
    </div>
  </nav>
</template>

<script>
import EventBus from '@/eventBus'
import { mapActions } from 'vuex'

export default {
  mounted () {
    console.log(document.cookie.name)
  },
  data () {
    return {
      sidebar: false,
      selectedLang: { title: 'Arabic', value: 'ar', image: require('../../assets/images/small/flag-500.png'), rtlDirection: true },
      langsOptions: [
        { title: 'English', value: 'en', image: require('../../assets/images/small/flag-01.png'), rtlDirection: false },
        { title: 'Arabic', value: 'ar', image: require('../../assets/images/small/flag-500.png'), rtlDirection: true }
      ]
    }
  },
  methods: {
    toggleSidebar () {
      this.sidebar = !this.sidebar
      EventBus.$emit('toggleSidebar', this.sidebar)
    },
    changeLanguage (lang, selected) {
      const dir = lang === 'ar' ? 'rtl' : 'ltr'
      const langAttr = lang === 'ar' ? 'ar' : 'en'
      this.$i18n.locale = lang
      this.selectedLang = selected
      this.modeChange({ rtl: dir, lang: langAttr })
      document.documentElement.dir = dir
      document.body.dir = dir
      document.documentElement.lang = langAttr
    },
    ...mapActions({
      modeChange: 'Setting/layoutModeAction'
    })
  }
}
</script>

<style lang="scss">
.dashboard-layout {
  nav {
    position: fixed;
    top: 0;
    right: 320px;
    width: calc(100% - 320px);
    padding: 24px 32px;
    background: var(--iq-primary);
    z-index: 5;
    color: #fff;

    &:lang(en) {
      right: auto;
      left: 320px;
    }

    .dropdown-lang-toggle {
      padding-inline-end: 20px;
      border-inline-end:  0.5px solid #D39D45;
      height: 29px;
      .dropdown-toggle {
        background-color: transparent;
        border: none;
        padding: 0;
        .language-title {
          .text, .icon {
            color: #fff;
          }
        }
        &:hover {
          background-color: transparent !important;
        }
      }
      &.show .dropdown-toggle {
        background-color: transparent !important;
      }
      .dropdown-menu {
        text-align: start;
        padding: 0;
        .dropdown-item {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
        }
      }
    }
    .notfiy-container {
      gap: 24px
    }
    .search-container {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      color: rgba($color: #f6f6f6, $alpha: 0.7);
      border-bottom: 1px solid;
      i {
        font-size: 22px;
      }
      ::placeholder {
        color: rgba($color: #f6f6f6, $alpha: 0.7);
      }
      input {
        color: #fff;
      }
    }
    .user-notify {
      i{
        font-size: 36px;
      }
      .notify-badge {
        position: absolute;
        top: -5px;
        right: -50%;
        background: var(--iq-warning);
        padding: 0 8px;
        border-radius: 5px;
        font-size: 11px;
      }
    }
    .user-notify-info {
      .user-info {
        gap: 5px;
        .user-img {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
      }
    }
    .mobile-icons-wrapper{
      display: none ;
      gap: 0.5rem;
      .user-notify{
        .notify-badge{
          padding: 0 4px;
        }
      }
      i{
        font-size: 30px;
      }
    }
    @media (max-width: 500px) {
      width: 100%;
      right: 0;
      padding: 16px 24px;
      .search-container, .dashboard-controller-type{
        display: none;
      }
      .user-notify-info{
        .user-notify{
          display: none;
        }
      }
      .mobile-icons-wrapper{
        display: flex;
      }
    }
  }
}
</style>
