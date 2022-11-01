<template>
  <b-form-group
      :label="label"
      :label-for="name"
  >
    <validation-provider
        #default="{ errors }"
        :name="name"
        :rules="validate"
    >
      <textarea
          :id="id"
          :disabled="disabled"
          :class="['form-control bg-white' , { 'is-invalid': errors.length > 0 }]"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('input', $event.target.value)"
      >
      </textarea>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>
<script>
export default {
  props: {
    label: {
      default: '',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    type: {
      default: 'text'
    },
    id: {
      default: '',
      type: String
    },
    validate: {
      default: '',
      required: false
    },
    value: {
      default: '',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    disabled: {
      default: false
    }
  },
  methods: {
    test (t, y) {
      console.log(t, y)
    }
  }
}
</script>
