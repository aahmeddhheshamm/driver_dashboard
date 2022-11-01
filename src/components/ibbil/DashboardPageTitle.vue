<template>
  <div>
    <section class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
    <div class="dashboard-page-title position-relative">
      <h5 class="py-1 font-weight-bold position-relative">
        <slot></slot>
      </h5>
      <span class="text-gray font-size-12 numbersOfStores" v-if="numbers">25 متجر</span>
    </div>
    <div v-if="showMainActions">
        <b-dropdown v-if="showExportation" variant="outline-primary" id="dropdown-1" text="تصدير الملف" class="m-md-2 actionButton">
          <b-dropdown-item>PDF</b-dropdown-item>
          <b-dropdown-item>DOCS</b-dropdown-item>
          <b-dropdown-item>Print</b-dropdown-item>
        </b-dropdown>
        <b-button v-if="showAddBtn" @click.prevent="$emit('addEvent')" variant="primary" class="px-5 py-2">+ إضافة</b-button>
      </div>
    </section>
    <div class="d-flex justify-content-between mb-3 ">
      <div v-if="showSearch" class="position-relative pr-4 bg-white p-0 m-0 searchInput iq-border-radius-5 w-20 overflow-hidden">
        <i class="las la-search position-absolute searchInputIcon"></i>
        <input
            type="text"
            class="form-control border-0 w-200px"
            :value="value"
            placeholder="البحث فى المتاجر"
            @input="$emit('input', $event.target.value)"
        >
      </div>
      <b-dropdown v-if="showFilter" variant="outline-primary" id="dropdown-1" text="فلتره" class="m-md-2 actionButton">
        <b-dropdown-item>PDF</b-dropdown-item>
        <b-dropdown-item>DOCS</b-dropdown-item>
        <b-dropdown-item>Print</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    },
    numbers: {
      default: '',
      type: String
    },
    showSearch: {
      default: false,
      type: Boolean
    },
    showFilter: {
      default: false,
      type: Boolean
    },
    showMainActions: {
      default: true,
      type: Boolean
    },
    showExportation: {
      default: false,
      type: Boolean
    },
    showAddBtn: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.dashboard-page-title{
  h5{
    border-inline-start: 2px solid #000;
    padding-inline-start: 16px;
    &::before{
      content: '';
      position: absolute;
      top: 50%;
      transform: translate(19px,-50%);
      width: 5px;
      height: 12px;
      border-radius: 10px;
      background: var(--iq-warning);
    }
  }
}
.actionButton {
  width: 145px;
  height: 39px;
}
.numbersOfStores {
  position: absolute;
  bottom: -16px;
  right: 20px;
}
.searchInput {height: 47px}
.searchInputIcon {
  top: 15px;
  right: 10px;
}
</style>
