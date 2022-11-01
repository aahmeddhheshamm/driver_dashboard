<template>
  <b-col cols="12">
    <iq-card class="bg-transparent mb-0">
<!--      <b-row class="d-flex align-items-center mb-2">
        <b-col md="12">-->
          <div class="d-flex align-items-center bg-transparent" v-if="$route.meta.breadCrumb.length > 0">
            <b-breadcrumb class="bg-transparent mb-0 mt-1">
              <b-breadcrumb-item to="/" class="font-size-16">
               {{$t('endUser.home')}}
              </b-breadcrumb-item>
              <b-breadcrumb-item
                  class="text-primary font-size-16"
                  v-for="item in $route.meta.breadCrumb"
                  :key="item.text"
                  :active="item.active"
                  :to="{name: item.to}"
              >
                {{ $t(item.text) }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
<!--        </b-col>
      </b-row>-->
    </iq-card>
  </b-col>
</template>
<script>
export default {
  name: 'BreadCrumb',
  mounted () {
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
