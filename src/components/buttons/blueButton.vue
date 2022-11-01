<template>
   <span class="container_button ml-0 ml-lg-5" @click="$emit('click')">
     <b-button variant="primary" class="navButton" :disable="disable">
      <span>{{text}}</span>
     </b-button>
   </span>
</template>
<script>
export default {
  props: {
    text: {
      require: true,
      type: String
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
