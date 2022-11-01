<template>
  <div class="second-menu bg-warning">
    <div class="second-menu__wrapper d-flex justify-content-between align-items-center gap_5" >
      <ul class="d-flex justify-content-between flex-grow-1 mb-0">
        <li v-for="(item , i) in secondMenu" :key="i" class="d-flex align-items-center py-3">
          <span v-html="item.icon"></span>
          <span> {{ $t(item.name) }}</span>
          <i class="las la-angle-down"></i>
          <div class="hovered-menu shadow position-absolute bg-white">
            <ul>
              <li v-for="(link , index) in item.nestedItems" :key="index">{{link}}</li>
            </ul>
          </div>
        </li>
      </ul>
      <button class="join-btn d-flex align-items-center rounded-sm px-4 py-1">
        <i class="las la-plus-square px-1"></i>
        انضم كتاجر او مقدم خدمة
        </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['secondMenu']
}
</script>
<style lang="scss">
.second-menu {
  .second-menu__wrapper{
    width: 85%;
    margin: auto;
  }
  svg {
    width: 20px !important;
    height: 17px;
  }
  ul {
    padding-inline-start: 0;
    margin-bottom: 0 !important;
    li {
      cursor: pointer;
      position: relative;
      transition: 0.3s ease-in-out;
      span {
        padding: 0 8px;
      }
      .hovered-menu{
        top: 65px;
        width: max-content;
        border-radius: 5px;
        z-index: 1111;
        min-width: 150px;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease-in-out;
        overflow: hidden;
        li{
          font-size: 0.9rem;
          color: #000;
          padding: 5px 10px;
          margin: 0;
          &:hover{
            color: white;
            background-color: var(--iq-primary);
          }
        }
      }
      &:hover{
        color : var(--iq-primary);
        svg, path{
          fill: var(--iq-primary) ;
        }
        i{
          transform: rotate(180deg)
        }
        .hovered-menu{
          transform: translateY(-10px);
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  .join-btn{
    transition: 0.3s ease-in-out;
    background-color: var(--iq-primary);
    color: white;
    border: 1px solid transparent;
    &:hover{
      background-color: transparent;
      border-color: #fff;
    }
  }
}
</style>
