<template>
  <b-modal
      :id="id"
      v-model="shown"
      @shown="onShown"
      @hidden="onHidden"
      class="mainModal"
      :size="size"
      centered
      no-close-on-backdrop
      hide-footer
      no-close-on-esc
  >
    <template #modal-header="{ close }">
      <div class="py-2 d-flex justify-content-between align-items-center w-100">
        <slot name="header"></slot>
        <div class="d-flex justify-content-end">
          <slot name="actions" class=""></slot>
          <img :src="require('@/assets/images/close.svg')"
               @click="close(); $emit('unsavedMsg')" class="closeImage ml-5 mr-4" />
        </div>
      </div>
    </template>
    <slot name="borderHeader"></slot>
    <div :class="{'p-4': !border}">
      <slot name="body"></slot>
    </div>
  </b-modal>
</template>

<script>
import Bus from '@/eventBus'
export default {
  props: {
    id: {
      type: String,
      default: () => ''
    },
    size: {
      type: String,
      default: () => ''
    },
    icon: {
      type: String,
      default: () => 'las la-trash-alt'
    },
    border: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      shown: false
    }
  },

  mounted () {
    Bus.$on('toggle_modal', (modalId) => {
      if (this.id === modalId) {
        this.shown = !this.shown
      }
    })
  },

  beforeDestroy () {
    Bus.$off('toggle_modal')
  },

  methods: {
    onShown () {
      this.$emit('opened')
    },

    onHidden () {
      this.$emit('closed')
    }
  }
}
</script>
<style scoped>
.popupButton span{
  font-weight: bold;
}
.w-40 {
  width: 40%;
}
.closeImage {
  width: 15px;
  cursor: pointer;
}
</style>
