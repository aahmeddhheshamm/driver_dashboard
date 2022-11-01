<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12">
        <iq-card v-if="hasPer('franchise.tab')">
          <template v-slot:headerTitle>
            <h4 class="card-title">Franchise</h4>
          </template>
          <template v-slot:body>
            <b-table striped responsive  class="mb-0 table-borderless" :items="allFranchisers">
            </b-table>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import axios from 'axios'
export default {

  name: 'franchies',
  mounted () {
    core.index()
  },
  created () {
    axios.get('https://max-gym.herokuapp.com/api/investor').then(res => {
      // console.log(res.data)
      this.allFranchisers = res.data
    })
  },
  data () {
    return {
      allFranchisers: []
    }
  }
}
</script>
<style>
.vue-daterange-picker{
  display: block !important;
}
.form-control.reportrange-text {
  border: 1px solid var(--iq-primary) !important;
  border-radius: 10px !important;
  color: var(--iq-primary) !important;
  margin: 10px 0 !important;
  height: auto !important;
  line-height: 30px !important;
  background: #fff !important;
}
</style>
