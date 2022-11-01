<template>
  <div
      class="custom-control custom-switch custom-switch-text custom-control-inline custom-switch-color mr-0" >
    <div class="custom-switch-inner">
      <input type="checkbox" class="custom-control-input bg-info" :id="'customSwitch'+id"  v-model="statusValue"
             @change="changeStatus">
      <label class="custom-control-label" :for="'customSwitch'+id">
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    status: {
      type: String
    },
    type: {
      type: String
    },
    id: {
      required: true
    },
    statusKeyId: {
      required: true
    },
    allData: {
      required: true
    }
  },
  data () {
    return {
      actualStatus: ''
    }
  },
  computed: {
    statusValue: {
      get: function () {
        if (this.status === 'active') {
          return 1
        } else {
          return 0
        }
      },
      set: function (v) {
        this.actualStatus = v
      }
    }
  },
  methods: {
    changeStatus () {
      const obj = {}
      obj.status = this.actualStatus ? 'active' : 'inactive'
      obj[this.statusKeyId] = this.id
      obj.type = this.type
      this.$emit('changeStatus', { payload: obj, data: this.allData })
    }
  }
}
</script>
