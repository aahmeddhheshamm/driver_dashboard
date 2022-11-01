///////////////////////////////////////////

/*
Props : filters_prop - Rounds Data - SyncWithReduceButton
---------------------------------------------------------------
All Filters is checkboxes ( multi select)
If you want a  radio button ( single select), add  "singleSeletable:true" as key
in the object of the single selectable filter

SyncWithReduceButton: if true it will be showing with the left vertical Nav Menu
show && vice versa.

for emit event on change checked, just add   onChangeFireAction:true at the
object of the filter

- filters_prop : EX
     [
        {
          name: 'Types',
          payload_name:'type',
          onChangeFireAction:true, // fire @change checkbox
          singleSeletable:true, // Radio Button ( singe select)

          by: [
            {
             name:this.$t('basic.on_paper'),
              id: 0,
              text_color:'red', // if need to change option's text color
              checked: false  // Its important for Gathering the checked data,
              disabled:false // disabled filter
            },
            {
             name:this.$t('basic.online'),
              id: 1,
              checked: false
            }
          ]
        }
      ]

----------------------------------------------------------------
Slots :
- extra_content ( Directly Above the Filters  )
- customFilters
----------------------------------------------------------------

*/

///////////////////////////////////////////

<template>
  <div>
    <!--------- extra_content Slot ( Links )  --------->
    <div
      v-if="$slots.extra_content"
      class="mb-2 block"
    >
      <slot name="extra_content" />
    </div>
    <form
      class="block"
      @submit="refilter()"
    >
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="font-bold">
          {{ $t("basic.filters") }}
        </h6>
        <button
          v-if="
            !loading && (filters_choosen.length > 0 || dataRange !== '')
          "
          type="reset"
          class="bg-transparent border-0 text-primary"
          @click="resetAll"
        >
          {{ $t("basic.reset_all") }}
        </button>
      </div>
      <hr>
      <!-- Choosen -->
      <div
        v-if="filters_choosen.length > 0"
        class="mb-1 d-block"
      >
        <b-badge
          v-for="(choose, i) in filters_choosen"
          :key="i"
          variant="primary"
          class="mr-1"
        >
          <span class="d-inline-block mr-1">{{ choose.name }}</span>
          <i
            class="las la-times-circle font-22 cursor-pointer"
            @click="remove(choose)"
          />
        </b-badge>
      </div>
      <hr v-if="filters_choosen.length > 0">
      <!-- options -->
      <app-collapse
        id="faq-payment-qna"
        type="margin"
        class="mt-2"
        accordion
      >
        <template v-for="filter in filters">
          <app-collapse-item
            v-if="filter.by.length > 0"
            :key="filter.id"
            :title="filter.name"
          >
            <ul class="list-unstyled">
              <li
                v-for="(filter_by, index) in filter.by"
                :key="index"
                class="mb-2"
                :class="{ 'flex items-center mb-2': filter_by.count }"
              >
                <!-- if options is multi selectble -->
                <template v-if="!filter.singleSeletable">
                  <b-form-checkbox
                    v-model="checked_filters"
                    :style="`color:${filter_by.text_color}`"
                    :value="filter_by"
                    :checked="filter_by.checked"
                    :disabled="filter_by.disabled || false"
                    @change="update(filter_by, filter.name)"
                  >{{ filter_by.name }}
                  </b-form-checkbox>
                  <!-- COUNT -->
                  <b-chip
                    v-if="filter_by.count"
                    class="counter"
                  >{{ filter_by.count }}
                  </b-chip>
                </template>
                <!-- if options is single selectble -->
                <template v-else>
                  <b-form-radio
                    v-model="checked_filters_singleSelect"
                    :class="{ 'float-left custom-control-primary': filter_by.count }"
                    :style="`color:${filter_by.text_color}`"
                    :name="filter.name.toLowerCase()"
                    :checked="filter_by.checked"
                    :disabled="filter_by.disabled"
                    :value="filter_by"
                    @change="update(filter_by, filter.name)"
                  >
                    {{ filter_by.name }}
                  </b-form-radio>
                  <!--                  <b-radio
                      v-model="checked_filters_singleSelect"
                      :class="{ 'float-left': filter_by.count }"
                      :style="`color:${filter_by.text_color}`"
                      :vs-value="filter_by"
                      :checked="filter_by.checked"
                      :name="filter.name.toLowerCase()"
                      :vs-name="filter.name.toLowerCase()"
                      :disabled="filter_by.disabled"
                      @change="update(filter_by, filter.name)"
                  >{{ filter_by.name }}
                  </b-radio>-->
                  <!-- COUNT -->
                  <b-chip
                    v-if="filter_by.count"
                    class="counter"
                  >{{ filter_by.count }}
                  </b-chip>
                </template>
              </li>
            </ul>
          </app-collapse-item>
        </template>
      </app-collapse>

      <!--------- CustomeFilers Slot ( Links )  --------->
      <div
        v-if="$slots.customFilters"
        class="my-2 px-4"
      >
        <slot name="customFilters" />
      </div>
      <!------------ Done Btn  ------------>
      <b-button
        variant="primary"
        class="mt-2 w-100 block mb-0"
        @click="refilter()"
      >{{ $t("basic.done") }}</b-button>
    </form>
  </div>

</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

export default {
  name: 'RoundFilter',

  components: {
    flatPickr,
    AppCollapse,
    AppCollapseItem
  },
  props: {
    filters_prop: {
      type: Array,
      required: true
    },
    rounds: {
      type: Array
    },
    SyncWithReduceButton: {
      type: Boolean,
      default: true
    },
    filter_date: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filters: this.filters_prop,
      activeRoundIndex: 1,
      checked_filters_singleSelect: null,
      filters_choosen: [],
      round: {},
      dataRange: '',
      configdatePicker: {
        mode: 'range',
        dateFormat: 'Y-m-d'
      },
      refilter_checked: null,
      refilter_checked_objects: {},
      showLoader: false
    }
  },
  computed: {
    restRoundDays () {
      return this.rounds ? new Date(this.round.to).getDate() - new Date().getDate() : false
    },
    hasCheckedFilters () {
      return !!(this.filters_choosen.length > 0 || this.checked_filters_singleSelect || this.getDate.length > 0)
    },
    disabledFilters () {
      const options = []
      this.filters.map(e => { options.push(...e.by.filter(s => s.disabled)) })
      return options
    },
    disabledCheckedFilters () {
      const options = []
      this.filters.map(e => { if (!e.singleSeletable) options.push(...e.by.filter(s => s.disabled)) })
      return options
    },
    disabledSingleSelectFilters () {
      const options = []
      this.filters.map(e => { if (e.singleSeletable) options.push(...e.by.filter(s => s.disabled)) })
      return options
    },
    checked_filters: {
      get () {
        const options = []
        this.filters.map(e => { if (!e.singleSeletable) options.push(...e.by.filter(s => s.checked)) })
        return options
      },
      set (v) {

      }
    }

  },
  watch: {
    filters_prop: {
      handler (v) {
        this.filters = v
        this.updateFilter_choosen()
      },
      deep: true
    },
    dataRange (v) {
      console.log('date', v)
      this.$emit('dateChanged', v)
    },
    loading (v) {
      if (v) this.startLoading()
      else this.endLoading()
    },
    filters_choosen (v) {
      if (!v.length) this.refilter()
    }
  },
  created () {
    this.updateFilter_choosen()
    if (this.rounds) {
      if (this.rounds.length === 1) this.round = this.rounds[0]
    }
  },

  methods: {
    /// ////////////////////////////
    // loading
    /// ////////////////////////////
    startLoading () {
      this.showLoader = true
      this.VSLoading(this.$refs.filterLoader)
    },
    endLoading () {
      this.stopVSLoading(this.$refs.filterLoader)
      this.showLoader = false
    },
    /// /////////////////////////////////////
    // Uncheck Filters (removed from filter_choosen)
    /// //////////////////////////////////////
    remove (choose) {
      this.filters_choosen.splice(this.filters_choosen.indexOf(choose), 1)
      this.checked_filters.splice(this.checked_filters.find(el => el.checked === false), 1)
      // Reset the checked value of removed
      this.filters_prop.map(fil => fil.by.map(fil_by => {
        console.log(fil_by)
        console.log(choose.id)
        if (fil_by.id === choose.id) {
          fil_by.checked = false
        }
        return fil_by
      }))
      this.checked_filters_singleSelect = null
      this.updateFilter_choosen()
    },
    /// /////////////////////////////////////////////////
    // Update Filters ( Added to filter_choosen)
    /// //////////////////////////////////////////////////
    update (val, name) {
      // Rest checked
      const parentFilter = this.filters.filter(el => el.name === name)[0]
      const subFilter = parentFilter.by[parentFilter.by.indexOf(val)]

      // reset checked singleSelectable case
      if (parentFilter.singleSeletable) {
        parentFilter.by.forEach(el => { el.checked = false })
      }

      subFilter.checked = !subFilter.checked
      this.updateFilter_choosen()
      if (parentFilter.onChangeFireAction) {
        this.$root.$emit(`onChange:${parentFilter.payload_name}`, this.refilter_checked_objects())
      }
    },
    // updateFilter_choosen
    updateFilter_choosen () {
      // Get Choosen Filter
      const chips = []
      this.filters.map(temp => {
        const x = temp.by.filter(fby => fby.checked === true)
        if (x.length !== 0) {
          x.map(temp => {
            chips.push(temp)
          })
        }
      })

      const checked = this.filters.map(el => {
        if (!el.singleSeletable) {
          return {
            name: el.payload_name || el.name.toLowerCase(),
            checked: el.by.filter(temp => temp.checked === true).map(temp => temp.id)
          }
        }
        const
          is_checked = el.by.some(temp => temp.checked === true)
        const checked_Ids = (is_checked ? el.by.find(temp => temp.checked === true).id : '')
        return {
          name: el.payload_name || el.name.toLowerCase(),
          checked: checked_Ids
        }
      })
      this.refilter_checked = checked
      this.refilter_checked_objects = () => {
        const obj = {}
        checked.forEach(e => { obj[e.name] = e.checked })
        return obj
      }

      this.filters_choosen = chips
    },
    refilter () {
      this.$emit('refilter', this.refilter_checked)
    },
    /// /////////////////////////////////////////////////
    //  Rest All Filters ( Empty filter_choosen)
    /// //////////////////////////////////////////////////

    resetAll () {
      // console.log('reset')
      this.dataRange = ''
      // Uncheck all filters
      if (this.hasCheckedFilters) {
        this.$emit('resetAll', true)

        // Reset checked filters
        this.filters.map(el => el.by.map(fil => {
          fil.checked = false
          return fil
        }))
        this.filters_choosen = []
        // this.checked_filters = []
        this.checked_filters_singleSelect = []

        // TODO: (WIP) Handle disabled filter senario
        this.filters_choosen = [...this.disabledFilters]
        this.checked_filters = [...this.disabledCheckedFilters]
        this.checked_filters_singleSelect = [...this.disabledSingleSelectFilters]
        this.dataRange = ''
        this.updateFilter_choosen()
        this.refilter()
      }
    },
    /// /////////////////////////////////////////////////
    //  Active||Show Sidebar
    /// //////////////////////////////////////////////////
    activeSidebar (id) {
      if (this.SyncWithReduceButton) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
    }

  }
}
</script>
<style scoped>
#faq-payment-qna .card .card-header {
  border-bottom: 1px solid gray !important;
}
#faq-payment-qna .card .card-body {
  background: #f1f0f0 !important;
}
</style>
