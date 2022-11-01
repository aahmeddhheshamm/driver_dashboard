<template>
  <aside :class="sidebar ? 'open-sidebar' : ''">
    <!-- logo2  -->
    <!-- <button class="sidebar-logo-btn border-0 d-flex align-items-center">
      <img src="@/assets/images/logo2.png" alt="" />
      <span class="sidebar-logo-text">QUBHAN GROUP</span>
    </button> -->
    <ul class="sidebar-items mb-0">
      <li v-for="(item, i) in SideBarItems" :key="i">
<!--        v-if="getStoreStatus === item.storeStatues"-->
        <template>
          <router-link
              :to="{ name: item.link.name }"
              tag="div"
              exact-active-class="active"
              class="sidebar-link-wrapper d-flex justify-content-between"
              v-if="!item.children"
          >
            <div class="sidebar-link d-flex align-items-center">
              <i :class="item.icon"></i>
              <span>{{ $t(item.name) }}</span>
            </div>
            <div v-if="item.children" class="sidebar-arrow">
              <i
                  class="las"
                  :class="item.is_active ? 'la-angle-up' : 'la-angle-down'"
              ></i>
            </div>
          </router-link>
          <div v-else class="collapse_nav">
            <div
                class="sidebar-link-wrapper d-flex justify-content-between"
                :class="
                $route.path.includes(item.name.toLowerCase()) ? 'active' : ''
              "
                @click="openSubMenu(i)"
            >
              <div class="sidebar-link d-flex align-items-center">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </div>
              <div v-if="item.children" class="sidebar-arrow">
                <i
                    class="las"
                    :class="item.is_active ? 'la-angle-up' : 'la-angle-down'"
                ></i>
              </div>
            </div>
            <collapse-sublinks
                @changeSelect="getSelectedRow"
                :sublinks="item.children"
                :collapse="item.is_active"
                :parentKey="i"
            />
          </div>
        </template>
      </li>
    </ul>
    <div class="help-logout">
      <ul class="px-0 m-0 pt-3">
<!--        <li>
          <main-select
              @change="changeActiveStore"
              :reduce="(store) => store.id"
              :options="myStores"
              v-model="storeActive.id"
              label="name"
              dir="rtl"
          ></main-select>
        </li>-->
        <li class="support-item d-flex align-items-center">
          <i class="las la-headset"></i>
          <span> {{ $t('main.sidebar.support')}}</span>
        </li>
         <li class="d-flex align-items-center text-warning" @click="logout()">
          <i class="las la-sign-in-alt"></i>
          <span>{{$t('main.sidebar.logout')}}</span>
        </li>
<!--        <li class="user-notify-info d-flex align-items-center gap_1 text-white">-->
<!--          <button type="button" class="user-info bg-transparent border-0 d-flex align-items-center">-->
<!--            <div class="user-img">-->
<!--              <img src="@/assets/images/ibbil/images/user-profile.jpg" alt="" />-->
<!--            </div>-->
<!--            <div class="user-notify-info-title">-->
<!--              <div class="welcome-user">على محمد</div>-->
<!--              <span class="welcome-user-subtitle">موظف بالشركة</span>-->
<!--            </div>-->
<!--            <span class="icon"></span>-->
<!--          </button>-->
<!--        </li>-->
      </ul>
    </div>
  </aside>
</template>
<script>
import SideBarItems from '@/FackApi/json/SideBar'
import CollapseSublinks from './CollapseSublinks.vue'
import EventBus from '@/eventBus.js'
import Scrollbar from 'smooth-scrollbar'
import mainInfoMixins from '@/mixins/mainInfo'
import { mapGetters } from 'vuex'
export default {
  mixins: [mainInfoMixins],
  components: { CollapseSublinks },
  computed: {
    ...mapGetters(['getStoreStatus'])
  },
  data () {
    return {
      SideBarItems,
      sidebar: false
    }
  },
  methods: {
    getSelectedRow (data) {
      this.checkElementActive()
    },
    checkElementActive (item) {
      return item.children.some((i) => i.is_active)
    },
    openSubMenu (index) {
      if ('children' in this.SideBarItems[index]) {
        this.SideBarItems[index].is_active =
            !this.SideBarItems[index].is_active
      }
    }
  },
  created () {
    EventBus.$on('toggleSidebar', (data) => {
      this.sidebar = data
    })
  },
  mounted () {
    Scrollbar.init(document.querySelector('.sidebar-items'))
  }
}
</script>
<style lang="scss">
.help-logout .vs__dropdown-toggle {
  background: #f0f0f036;
  border: 0 !important;
}
.dashboard-layout {
  .sidebar-logo-btn {
    padding: 0 7px;
    height: 48px;
    min-height: 48px;
    max-height: 48px;
    background: #6EBF975F;
    border-radius: 10px !important;
    img {
      border-radius: inherit;
    }
    .sidebar-logo-text {
      margin-inline-start: 33px;
      line-height: 0;
      color: #fff
    }
  }
  aside {
    position: fixed;
    top: 0;
    right: 0;
    padding: 32px 0;
    padding-inline-start: 32px;
    width: 320px;
    min-height: 100vh;
    height: 100vh;
    display: flex !important;
    justify-content: space-between;
    flex-direction: column;
    color: #fff;
    background: var(--iq-primary);
    transition: 0.3s ease;
    z-index: 10;
    &:lang(en) {
      right: auto;
      left: 0;
    }
    .dropdown-toggle {
      border: none !important;
      padding: 0 !important;
      background-color: transparent !important;
    }
    .dropdown-menu {
      top: 18px !important;
      width: 100%;
      text-align: start !important;
      margin: 0;
      padding: 0;
      height: 400px;
      overflow-y: scroll;
    }
    .dropdown-logo-item {
      .dropdown-item {
        padding: 10px 20px !important;
        display: flex;
        align-items: center;
        gap: 10px
      }
    }
    // user
    .user-notify-info {
      .user-info {
        gap: 16px;
        .user-img {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .user-notify-info-title {
          text-align: start;
        }
        .welcome-user {
          color: #F6F6F6;
        }
        .welcome-user-subtitle {
          color: #919191;
        }
      }
      .icon {
        border-width: 8px;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
      }
    }
    // *** end
    li {
      font-size: 20px;
      margin-top: 4px;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      i {
        font-size: 25px;
        margin-inline-end: 8px;
      }
      &.support-item {
        border-bottom: 1px solid rgba(255 255 255 / .4);
        padding-bottom: 18px !important;
      }
    }
    .dropdown-logo-item-img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    .dropdown-logo-item-img-active {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .logo {
      padding-inline-start: 16px;
      margin-bottom: 2.5rem;
    }
    .sidebar-items {
      height: 75%;
      padding: 0;
      padding-top: 50px !important;
      .sidebar-link-wrapper {
        border-radius: 0 10px 10px 0;
        padding: 8px 0;
        padding-inline-start: 16px;
        transition: 0.3s ease-in-out;
        &:hover {
          background: rgba($color: #fff, $alpha: 0.1);
        }
        &.active {
          background: #f6f6f6;
          color: var(--iq-primary);
        }
      }
      .sidebar-arrow {
        padding-inline-end: 16px;
        i {
          font-size: 18px;
        }
      }
    }
    .help-logout {
      margin-inline-end: 32px;
      //border-top: 1px solid rgba($color: #fff, $alpha: 0.4);
      color: #b0bfb8;
      ul {
        li {
          padding: 4px 0;
          font-size: 18px;
          &:hover {
            color: var(--iq-warning);
          }
        }
      }
    }
    .scrollbar-track {
      border-radius: 20px;
      background: rgb(0 0 0 / 6%);
      left: 0;
      right: unset;
      margin-inline-end: 8px;
      .scrollbar-thumb {
        background: rgb(0 0 0 / 28%);
      }
    }
    @media (max-width: 500px) {
      padding-top: 24px;
      padding-bottom: 24px;
      width: 300px;
      right: -300px;
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
      .logo {
        margin-bottom: 0;
      }
      .sidebar-items {
        height: 70%;
      }
      &.open-sidebar {
        right: 0;
      }
    }
  }
  .collapse_nav .router-link-active {
    background: rgba($color: #fff, $alpha: 0.1);
    padding: 12px;
    padding-inline-start: 16px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 17px;
  }
}
</style>
