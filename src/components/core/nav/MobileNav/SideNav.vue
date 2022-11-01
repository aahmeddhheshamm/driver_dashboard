<template>
  <transition
    name="fade"
    enter-active-class="animate__animated animate__fadeIn animate__faster"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
  >
    <div v-show="sideNav" class="side-nav" @click.self="close()">
      <transition
        name="slide"
        enter-active-class="animate__animated animate__slideInRight animate__faster"
        leave-active-class="animate__animated animate__slideOutRight animate__faster"
      >
        <aside v-show="sideNav" class="shadow">
          <!-- mobile-menu-header -->
          <header class="mobile-menu-head d-flex align-items-center">
            <div v-if="subMenu.open" @click="goBack()" class="go-back">
              <i class="las la-angle-right"></i>
            </div>
            <div class="current-menu-title flex-grow-1 text-center">
              {{ $t(subMenu.title) }}
            </div>
            <div class="mobile-menu-close" @click="close()">
              <i class="las la-times"></i>
            </div>
          </header>
          <!-- mobile-main-menu -->
          <div class="mobile-main-menu position-relative">
            <ul class="p-0">
              <li v-for="(item, i) in listItems" :key="i" @click="openSubMenu(item)">
                <div
                  class="
                    list-item
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <div
                    class="mobile-main-menu__link">
                    <span
                      v-if="item.icon"
                      v-html="item.icon"
                      class="link-icon"
                    ></span>
                    <span class="link">{{ $t(item.name) }}</span>
                  </div>
                  <div v-if="item.icon" class="mobile-menu__expand">
                    <i class="las la-angle-left"></i>
                  </div>
                </div>
                <transition
                  name="slide"
                  enter-active-class="animate__animated animate__slideInRight animate__faster"
                  leave-active-class="animate__animated animate__slideOutRight animate__faster"
                >
                  <div class="sub-menu" v-show="subMenu.open">
                    <ul class="p-0">
                      <li v-for="(link, i) in subMenu.items" :key="i">
                        {{ link }}
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </aside>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['listItems', 'sideNav'],
  data () {
    return {
      subMenu: {
        open: false,
        title: null,
        items: []
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.goBack()
    },
    openSubMenu (item) {
      if (!item.nestedItems) return
      this.subMenu.open = true
      this.subMenu.title = item.name
      this.subMenu.items = item.nestedItems
    },
    goBack () {
      this.subMenu.open = false
      this.subMenu.title = null
      this.subMenu.items = []
    }
  }
}
</script>

<style lang="scss">
.side-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000, $alpha: 0.5);
  z-index: 111;
}
aside {
  position: fixed;
  top: 0;
  right: 0;
  width: 70vw;
  height: 100vh;
  background: var(--iq-primary);
  z-index: 1111;
  .mobile-menu-head {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    > div {
      padding: 12px 20px;
    }
    .go-back {
      border-inline-end: 1px solid rgba(255, 255, 255, 0.2);
    }
    .mobile-menu-close {
      border-inline-start: 1px solid rgba(255, 255, 255, 0.2);
    }
    i {
      font-size: 18px;
    }
  }
  ul {
    li {
      padding: 12px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      .link-icon {
        padding-inline-end: 8px;
      }
      .sub-menu {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        background: var(--iq-primary);
      }
    }
  }
}
</style>
