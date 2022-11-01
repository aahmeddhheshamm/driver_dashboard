<template>
  <b-collapse v-model="collapse">
    <ul class="sidebar-sublinks p-0">
      <li v-for="(sublink, i) in sublinks" :key="i">
        <router-link :to="{name: sublink.link.name}" exact tag="div" class="sublink d-flex align-items-center">
          <i :class="sublink.icon"></i>
          <span>{{ sublink.name }}</span>
        </router-link>
      </li>
    </ul>
  </b-collapse>
</template>

<script>
export default {
  props: ['sublinks', 'collapse']
}
</script>

<style lang="scss">
.dashboard-layout {
  aside {
    .sidebar-sublinks {
      margin-inline-start: 32px;
      li {
        padding: 4px 0;
        padding-inline-start: 16px;
        color: var(--iq-warning);
        &:hover{
          transform: translateX(-8px);
        }
        &.active-sublink {
          background: rgba($color: #fff, $alpha: 0.1);
        }
      }
    }
  }
}
</style>
