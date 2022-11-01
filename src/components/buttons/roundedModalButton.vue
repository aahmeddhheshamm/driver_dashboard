<template>
  <b-button :class="`${ type == 'add' ? 'button-orange-modal' : 'bg-blue'}`" type="submit">
    <i :class="icon"></i>
  </b-button>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    },
    type: {
      type: String
    }
  }
}
</script>
<style>

</style>
