<template>
  <div :class="`searchbox-datalink`" id="searchbox-datalink">
    <ul class="m-0 p-3">
      <h6>Member</h6>
      <template v-if="Alldata.data">
<!--        <li v-for="(item,index) in Alldata" :key="index" class="iq-bg-primary-hover rounded" @click="removeClass">
          <template >
            <router-link :to="{name: 'profile', params:{ id: item.id }}" class="nav-link  pr-2" @click="removeClass">
              <img v-if="item.member.profile" :src="item.member.profile" class="avatar-30 rounded-circle"/>
              <img v-else src="../../../assets/images/user/user.jpg" class="avatar-30 rounded-circle"/>
              <span class="ml-2">{{ item.name }}</span>
            </router-link>
          </template>
        </li>-->
        <li class="iq-bg-primary-hover rounded" @click="removeClass">
          <template >
            <router-link v-if="Alldata.data.member != null" :to="{name: 'profile', params:{ id: Alldata.data.member.id }}" class="nav-link  pr-2" @click="removeClass">
<!--              <img v-if="Alldata.member.profile" :src="Alldata.member.profile" class="avatar-30 rounded-circle"/>-->
              <img src="../../../assets/images/user/user.jpg" class="avatar-30 rounded-circle"/>
              <span class="ml-2">{{ Alldata.data.name }}</span>
              <b-badge class="ml-2" pill :variant="'success'">Member</b-badge>
            </router-link>
            <router-link :to="{name: 'leadProfile', params:{id: Alldata.data.id}}" v-else class="nav-link  pr-2" @click="removeClass">
              <!--              <img v-if="Alldata.member.profile" :src="Alldata.member.profile" class="avatar-30 rounded-circle"/>-->
              <img src="../../../assets/images/user/user.jpg" class="avatar-30 rounded-circle"/>
              <span class="ml-2">{{ Alldata.data.name }}</span>
              <b-badge class="ml-2" pill :variant="'primary'">Lead</b-badge>
            </router-link>
          </template>
        </li>
      </template>
      <template v-else>
        <li class="nav-link">Search Not Found</li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'GlobalSearch',
  props: {
    search: { type: String, default: '' },
    show: { type: Boolean, default: false },
    Alldata: {}
  },
  computed: {
  },
  mounted () {
  },
  data () {
    return {
      globalSearch: ''
    }
  },
  methods: {
    removeClass () {
      document.getElementById('searchbox-datalink').classList.remove('show-data')
      this.$emit('closeSearch', true)
    }
  }
}
</script>
