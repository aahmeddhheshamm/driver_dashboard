<template>
  <div class="main_menu">
    <div class="bg-primary">
      <b-container>
        <div
          class="d-flex py-3 justify-content-between align-items-center gap_1"
        >
        <!-- Logo -->
            <b-img
              class="ibbilLogo"
              :src="require('@/assets/images/ibbil/logo.svg')"
            ></b-img>
            <!-- Website Pages links -->
            <div>
              <ul class="m-0 p-0 d-flex justify-content-start gap_1">
                <li v-for="(item, i) in mainMenu" :key="i">{{ $t(item.name) }}</li>
              </ul>
            </div>
            <div
              class="inputContainer flex-grow-1 bg-white ps-3 d-flex align-items-center px-3 rounded flex-grow-1 "
            >
              <i class="las la-search text-gray font-size-22"></i>
              <b-input
                :placeholder="$t('endUser.searchInAllDepartments')"
                class="bg-transparent border-0 flex-grow-1 min-width-15 text-muted"
                v-model="search"
              ></b-input>
          </div>
          <div class="d-flex align-items-center">
            <div class="actions_nav">
              <ul class="ml-auto navbar-list d-flex align-items-center">
                <li class="select-lang text-black d-flex bg-white rounded py-1 px-2 nav-item" :class="selectLangPopUp ? 'bg-white text-black' : 'bg-transparent text-white'" @click="selectLangPopUp = !selectLangPopUp">
                    <ul class="d-flex flex-column align-items-center p-0">
                      <li class="d-flex justify-items-center align-items-center text-center">
                        <img :src="selectedLang.image" style="width : 25px; height:15px; margin-inline-end : 5px" alt="" class="border" >
                        <span>{{$t(selectedLang.title)}}</span>
                        <i class="las mx-2" :class="selectLangPopUp ? 'la-angle-up' : 'la-angle-down'"></i>
                      </li>
                      <li class="border-top" :class="!selectLangPopUp ? 'd-none' : 'd-block'"
                        @click="rtlChange(notSelectedLang[0].rtl);langChange(notSelectedLang[0]);">
                        <span style="font-size : 13px">{{$t(notSelectedLang[0].title)}}</span>
                        <img :src="notSelectedLang[0].image" style="width : 22px; height:12px; margin-inline-start : 5px" alt="" class="border" >
                      </li>
                    </ul>
                </li>
                <li class="nav-item">
                  <a
                    class="search-toggle iq-waves-effect language-title"
                    href="#"
                  >
                    <span class="text-white" >
                      {{ $t("main.login") }}
                    </span>
                    <i class="las la-user text-white font-size-22"></i>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="search-toggle iq-waves-effect language-title"
                    href="#"
                  >
                    <span class="text-white">
                      {{ $t("main.cart") }}
                    </span>
                    <i class="las la-shopping-cart text-white font-size-22"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['mainMenu'],
  data () {
    return {
      search: '',
      rtl: false,
      selectLangPopUp: false
    }
  },
  computed: {
    ...mapGetters({
      selectedLang: 'Setting/langState',
      langsOptions: 'Setting/langOptionState'
    }),
    notSelectedLang () {
      return this.langsOptions.filter(lng => lng.title !== this.selectedLang.title)
    }
  },
  methods: {
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang.value
      document.getElementsByClassName('iq-show')[0].classList.remove('iq-show')
      if (lang.value === 'ar') {
        this.rtlAdd(lang)
      } else {
        this.rtlRemove(lang)
      }
      console.log(lang)
    },
    rtlChange (mode) {
      this.rtl = mode
      this.modeChange({ rtl: mode, dark: this.darkMode })
      console.log(mode)
    },
    ...mapActions({
      langChangeState: 'Setting/setLangAction',
      rtlAdd: 'Setting/setRtlAction',
      rtlRemove: 'Setting/removeRtlAction',
      modeChange: 'Setting/layoutModeAction'
    })
  },
  mounted () {
    console.log(this.selectedLang)
  }
}
</script>

<style>
.select-lang{
  transition: 0.3s ease-in-out;
}
.select-lang li{
  cursor: pointer;
}
</style>
