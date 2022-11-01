<template>
  <div class="mt-0 mx-5 mb-5 iq-maintenance">
    <div class="container-fluid p-0">
      <div class="row no-gutters">
        <div class="col-sm-12 text-center">
          <div class="iq-maintenance">
            <img :src="require('@/assets/images/error/error-02.png')" class="img-fluid" alt="error">
            <h3 class="mt-4 mb-1">Hello CoFlow</h3>
            <p>Development</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  name: 'welcome',
  mounted () {
    core.index()
  }
}
</script>

<style>
.w-welcome{
  width: 420px;
}
</style>
