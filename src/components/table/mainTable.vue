<template>
  <div>
    <b-table
      id="table-transition-example"
      class="vgt-table bordered mb-1"
      :items="items"
      name="id"
      :fields="fields"
      responsive
      striped
      show-empty
      :tbody-transition-props="transProps"
      primary-key="id"
      :busy="loadingTable"
      @sort-changed="sortChanged"
      :no-sort-reset="true"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner
            type="grow"
            label="Loading..."
            variant="primary"
          />
        </div>
      </template>

      <template
        v-for="(field,key) in fields"
        v-slot:[`cell(${field.key})`]="data"
      >
        <div :key="key">
          <!-- handle Image -->
          <b-avatar
            v-if="field.type=='image'"
            class="avatar-50"
            :src="$_.get(data.item, field.key) ? $_.get(data.item, field.key) : require('@/assets/images/user/default-user-image.png')"
          />

          <!-- handle status -->
          <strong v-else-if="field.type == 'status'" class="py-1 iq-border-radius-5 font-size-1 text-center">
            <mainstatus :status="$_.get(data.item, field.key)" />
          </strong>

          <!-- actions -->
          <div v-else-if="field.type == 'actions'">
            <cell-actions
              :cell-actions="field"
              :data-item="data.item"
            />
          </div>

          <!-- Array handler -->
          <div v-else-if="field.type == 'array'">
            <span v-if="field.array_keys" >
              <ul class="p-0">
                <li v-for="(arr, key) in $_.get(data.item, field.key)" :key="key">
                    <span v-for="(ind, key1) in field.array_keys" :key="key1">{{ arr[ind] }} </span>
                </li>
              </ul>
            </span>
            <span v-else>
              <span v-for="(arr, key) in $_.get(data.item, field.key)" :key="key">
                {{ arr }}
                <span v-if="(key < $_.get(data.item, field.key).length-1)">,</span>
              </span>
            </span>
          </div>

          <!-- Multi-image handler -->
          <div class="min-width-image-cell" v-else-if="field.type == 'multi_image'">
            <div class="iq-media-group position-relative">
              <b-link href="#" class="iq-media" v-for="(image, counter) in $_.get(data.item, field.key).slice(0,3)" :key="counter">
                <b-img  class="avatar-50" rounded="circle" fluid :src="image" :alt="image.name" />
                <div v-if="($_.get(data.item, field.key).length > 3) && counter === 2" class="more-images text-white">{{ $_.get(data.item, field.key).length-3 }}+</div>
              </b-link>
            </div>
          </div>

          <!-- Multi-text handler -->
          <div v-else-if="field.type == 'multi-text'">
            <span v-for="(arrKey, key) in field.key.split(',')" :key="key">
              <span v-if="$_.get(data.item, arrKey)">
                {{ $_.get(data.item, arrKey) }}
              </span>
            </span>
          </div>

          <!-- Multi-value handler -->
          <div v-else-if="field.type == 'multi-value'">
            <ul class="p-0">
              <li v-for="(arrKey, key) in field.key.split(',')" :key="key">
                <span v-if="$_.get(data.item, arrKey) > 0">
                  <span v-if="arrKey.includes('egp')">EGP </span>
                  <span v-else-if="arrKey.includes('euro')">EUR </span>
                  <span v-else-if="arrKey.includes('dollar')">$ </span>
                  {{ $_.get(data.item, arrKey) }}
                </span>
                <span v-else>N/A</span>
              </li>
            </ul>
          </div>

          <!-- handle Text -->
          <p
            v-else
            class="text-nowrap m-0"
          >
            <span v-if="$_.get(data.item, field.key)">
              {{ $_.get(data.item, field.key).length > 30 ? $_.get(data.item, field.key).substring(0,30) + '...' : $_.get(data.item, field.key) }}
            </span>
            <span v-else>
              ---
            </span>
          </p>
        </div>

      </template>
      <template v-slot:cell(change_status)="data">
        <changeStatus
            :allData = data
            :id="data.item.id"
            :type="data.field.tableType"
            :status="data.item.status"
            :statusKeyId="data.field.idKey"
            @changeStatus="changeStatus"
        />
      </template>
    </b-table>
    <div class="bg-primary py-2 px-3 d-flex justify-content-between align-items-center iq-border-radius-5 mt-0">
      <span>{{ pagination.totalPages }}-{{ pagination.currentPage }} من {{ pagination.itemCount }} مستخدم</span>
      <div class="d-flex flex-nowrap justify-content-end align-items-center gap_1 flex-grow-1">
          <span>الصفوف لكل صفحة</span>
          <b-select class="footer-select">
            <b-select-option value="1">10</b-select-option>
            <b-select-option value="2">25</b-select-option>
            <b-select-option value="3">50</b-select-option>
          </b-select>
          <div class="d-flex">
          <span class="bg-white iq-border-radius-5 arroy-footer-table mb-0 ml-1" @click="page =pagination.currentPage + 1">
              <i class="las la-arrow-right text-primary"></i>
          </span>
            <span class="bg-white iq-border-radius-5 arroy-footer-table mb-0" @click="page =pagination.currentPage - 1">
              <i class="las la-arrow-left text-primary"></i>
          </span>
          </div>
        </div>
    </div>
<!--    <b-pagination
      v-if="pagination.total > pagination.per_page"
      v-model="pagination.current_page"
      :total-rows="pagination.total"
      :per-page="pagination.per_page"
      first-number
      last-number
      class="mb-3 mt-1 mt-sm-0"
      prev-class="prev-item"
      next-class="next-item"
      align="right"
      @input="getListData"
    >
    </b-pagination>-->
  </div>
</template>

<script>
import Bus from '@/eventBus'
import mainstatus from './status'
import mainService from '@/services/main'
import cellActions from './cellActions'
import changeStatus from './changeStatus'
import { core } from '@/config/pluginInit'
export default {
  components: {
    mainstatus,
    cellActions,
    changeStatus
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: [Array, Object],
      required: false
    },
    list_url: {
      type: String
    },
    additionalUrl: {
      type: String
    },
    params: {
      type: [Object, Array]
    },
    reloadData: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      transProps: {
        name: 'flip-list'
      },
      page: 1,
      listOfData: [],
      pagination: {},
      loadingTable: false,
      moreImages: 2
    }
  },
  watch: {
    params (a) {
      this.getListData()
    },
    reloadData (val) {
      if (val) {
        this.items = null
        this.getListData()
      }
    },
    page (val) {
      if (val > 0) {
        this.items = null
        this.getListData()
      }
    }
  },
  created () {
    this.getListData()
  },
  methods: {
    async getListData () {
      this.listOfData = []
      const filters = {}
      if (this.params) {
        this.params.map(data => {
          filters[data.name] = data.checked
        })
      }
      this.loadingTable = true
      let List = []
      if (!Array.isArray(this.items) && !this.items?.length > 0) {
        List = await
        mainService.listDataTabl(
                `${this.list_url}?page=${this.page}${
                    this.additionalUrl ? this.additionalUrl : ''}`,
                filters
        )
        if (List.data) {
          this.items = List.data.data
          this.pagination = List.data?.meta
        }
      } else {
        List = this.data
      }
      this.loadingTable = false
      this.reloadData = false
    },
    sortChanged (data) {
      this.$emit('sortChanged', data)
    },
    changeStatus (data) {
      mainService.changeStatus(data.payload).then(res => {
        core.showSnackbar('success', res.data.message)
        const IndexRow = this.listOfData.findIndex(row => row.id === data.data.item.id)
        if (this.listOfData[IndexRow].status === 'active') {
          this.listOfData[IndexRow].status = 'inactive'
          this.listOfData[IndexRow]._rowVariant = 'secondary'
        } else {
          this.listOfData[IndexRow].status = 'active'
          this.listOfData[IndexRow]._rowVariant = ''
        }
      })
    }
  },
  mounted () {
    Bus.$on('reloadTableAfterDelete', ifReload => { this.reloadData = true })
  }
}
</script>
<style>
table#table-transition-example .flip-list-move {
  transition: transform 0.5s;
}
.footer-select {
  width: 70px !important;
}
.arroy-footer-table{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 40px;
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 20px;
}
.arroy-footer-table i {
  font-size: 20px;
}
</style>
