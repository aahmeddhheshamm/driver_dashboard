<template>
  <b-form-group
      :label="labelTitle"
      :label-for="name"
  >
    <validation-provider
        #default="{ errors }"
        :name="name"
        :rules="validate"
        class="flex-grow-1"
    >
      <vue-select
          :dir="dir"
          :ref="ref"
    v-model="selected"
    :multiple="multiple"
    :close-on-select="closeOnSelect_v"
    :clearable="clearable_v"
    :placeholder="placeholder"
    :name="name"
    :options="options"
    :label="label"
    :reduce="reduce"
    :disabled="disabled"
    :value="selected"
    :loading="showLoadingIcon"
    :taggable="taggable"
    @input="onChange"
    @search:focus="onFocus"
    @search:blur="onBlur"
    @option:deselected="deselected"
    @option:selecting="selecting"
    :no-drop="taggable"
    :class="[{ 'is-invalid': errors.length > 0 }]"
  >
    <template #open-indicator="{ attributes }" v-if="!taggable">
      <span v-bind="attributes"><span data-icon="T" class="icon d-flex"></span></span>
    </template>
    <template
      v-if="showSelectAll"
      #list-header
    >
      <li class="cursor-pointer text-white pl-3 bg-warning" @click="checkAll = !checkAll; checkAllOptions()">Select All</li>
    </template>
    <template
      v-if="noOptionsText"
      v-slot:no-options="{ search, searching }"
    >
      <template v-if="searching">
        {{ $t('basic.no_results_found_for') }} <em>{{ search }}</em>.
      </template>
      <em
        v-else
        style="opacity: 0.5"
      >{{ noOptionsText }}</em>
    </template>
    <slot />
  </vue-select>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>
<script>
import VueSelect from 'vue-select'

export default {
  name: 'VSelect',
  components: { VueSelect },
  props: {
    dir: {
      type: String,
      default: 'ltr'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    taggable: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean
    },
    clearable: {
      type: Boolean

    },
    disabled: {
      type: Boolean

    },
    validate: {
      default: '',
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    ref: {
      type: String,
      default: ''
    },
    name: {
      type: String
    },
    options: {
      type: Array,
      require: true
    },
    label: {
      type: String
    },
    labelTitle: {
      default: '',
      type: String
    },
    reduce: {
      type: Function
    },
    noOptionsText: {
      type: String,
      default: ''
    },
    showLoadingIcon: {
      type: Boolean,
      default: false
    },
    hideSelectAll: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      checkAll: false,
      selected: null

    }
  },
  computed: {
    closeOnSelect_v () {
      return this.closeOnSelect || !this.multiple
    },
    clearable_v () {
      return this.clearable || this.multiple
    },
    showSelectAll () {
      return !this.hideSelectAll && (!this.taggable && this.options.length && this.multiple && this.selected &&
          this.options.length !==
          this.selected.length)
    }
  },
  watch: {
    selected (val) {
      if (!this.taggable && val && this.selected && this.selected.length !== this.options.length) this.checkAll = false
      this.$attrs.value = val
    },
    '$attrs.value': function (val) {
      this.selected = val
    }
  },
  created () {
    this.selected = this.$attrs.value
  },
  methods: {
    onChange (e) {
      this.$emit('input', this.selected)
      this.$emit('change', this.selected)
    },
    deselected (e) {
      this.$emit('deselected', e)
    },
    selecting (e) {
      this.$emit('selecting', e)
    },
    onFocus () {
      this.$emit('v-select-focus')
    },
    onBlur () {
      this.$emit('v-select-blur')
    },
    checkAllOptions () {
      if (this.checkAll) {
        if (this.reduce !== undefined) this.selected = this.options.map(el => this.reduce(el))
        else this.selected = this.options
      } else this.selected = this.multiple ? [] : null
      this.onChange()
    }
  }
}

</script>

<style lang="scss">
.vs--open .vs__selected {
  top: 10px;
}
//.vs--searchable {
//  box-shadow: 0 0px 11px 1px #2b58422e inset;
//}
.vs--searchable:active {
  box-shadow: none;
}
.vs--searchable div {
  min-height: 43px !important;
}

.vs__dropdown-toggle {
  border: 1px solid #d7dbda !important;
  padding-bottom: 0 !important;
}
.is-invalid .vs__dropdown-toggle {
  border: 1px solid rgb(255 0 0) !important;
}
.vs--searchable div {
  border-radius: 4px !important;
}
.vs__open-indicator {
  fill: var(--iq-black)
}
.v-select {
  .vs__dropdown-menu {
    overflow-x: hidden;
  }

  .vs__dropdown-option--selected {
    display: none;
  }
  .vs__search {

    $placeholderColor: #ccc;

    &::placeholder {
      color: $placeholderColor;
    }

    &::-webkit-input-placeholder {
      /* Edge */
      color: $placeholderColor;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $placeholderColor;
    }
  }
}
.vs--multiple {
  .vs__selected-options{
    .vs__selected{
      height: 30px;
      min-width: 90px !important;
      display: flex;
      justify-content: space-around;
      background: none !important;
      margin: 7px 5px 0px 2px !important;
    }
  }
}
.vs__selected-options {
  min-height: 43px !important;
}
.vs__search::placeholder {
  font-size: 20px;
  color: var(--iq-primary) !important;
}
</style>
