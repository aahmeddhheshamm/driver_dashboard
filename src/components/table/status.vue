<template>
  <b-badge :class="`font-size-15 status--${filterStatus}`">
    <span >{{ status }}</span>
  </b-badge>
</template>

<script>
export default {
  name: 'MainStatus',
  props: {
    status: {
      type: String
    }
  },
  /*  filters: {
    removeSpace(value) {
      return value.toLowerCase().replace(' ', '_') || this.data.toLowerCase().replaceAll(' ', '_')
    },
  }, */
  computed: {
    filterStatus () {
      return this.status ? this.status.toLowerCase().replace(' ', '_') || this.data.toLowerCase().replaceAll(' ',
        '_') : ''
    }
  }
}
</script>
