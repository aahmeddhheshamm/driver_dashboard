<template>
  <div>
    <b-spinner small type="grow"></b-spinner>
    <span v-if="text">{{ text }} ...</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>
