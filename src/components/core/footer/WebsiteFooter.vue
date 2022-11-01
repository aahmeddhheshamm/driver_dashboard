<template>
  <footer class=" bg-white iq-footer bg-primary mx-0">
    <b-container>
      <b-row class="pt-4">
        <b-col md="4">
          <img :src='footerImage' alt="ibbil" />
          <p class="text-white mt-4 font-size-12">
            {{$t('endUser.footer')}}
          </p>
          <ul class="d-flex p-0 font-size-24" style="gap: 20px">
            <li><a><i class="lab la-twitter text-white"></i></a></li>
            <li><a><i class="lab la-linkedin-in text-white"></i></a></li>
            <li><a><i class="lab la-instagram text-white"></i></a></li>
            <li><a><i class="lab la-facebook-f text-white"></i></a></li>
            <li><a><i class="lab la-whatsapp text-white"></i></a></li>
          </ul>
        </b-col>
        <b-col cols="8" md="3" class="">
          <div>
            <h3 class="text-white mt-0 mt-0 mb-3 position-relative header-website-footer">
              {{$t('endUser.shops')}}
            </h3>
            <ul class="p-0 font-size-16 footer-menu" style="gap: 20px">
              <li>متاجر الأبل</li>
              <li>متاجر الأعلاف</li>
              <li>متاجر الأغذية الحيوانية</li>
              <li>متاجر الشريحة الذكية</li>
              <li>متاجر إكسسوارات الإبل</li>
              <li>متاجر مستلزمات الإبل</li>
              <li>متاجر منتجات الإبل</li>
            </ul>
          </div>
        </b-col>
        <b-col cols="4" md="2" class="">
          <div>
          <h3 class="text-white mt-0 mt-0 mb-3 position-relative position-relative header-website-footer">
            {{$t('endUser.services')}}
          </h3>
          <ul class="p-0 font-size-16 footer-menu" style="gap: 20px">
            <li>التصاريح</li>
            <li>التأمين</li>
            <li>النقل</li>
            <li>البيطرة</li>
          </ul>
          </div>
        </b-col>
        <b-col md="3" class="d-flex justify-content-center ">
          <div class="">
          <h3 class="text-white mt-0 mt-0 position-relative header-website-footer mb-3">
            {{$t('endUser.termsConditions')}}
          </h3>
          <ul class="p-0 font-size-16 footer-menu" style="gap: 20px">
            <li>الأحكام والشروط</li>
            <li>سياسة الخصوصية</li>
          </ul>
            <img class="m-auto" :src="require('@/assets/images/ibbil/vision.svg')">
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!--Copyright-->
    <b-container>
      <div class="d-flex justify-content-between copyrightsFooter">
        <p class="m-0"> ©جميع الحقوق محفوظة لمنصة إبل 2022</p>
        <p class="m-0"> برمجة وتطوير <span class="font-weight-bold">شركة دفع</span></p>
      </div>

    </b-container>
    <!--/.Copyright-->

  </footer>
</template>
<script>
export default {
  data () {
    return {
      footerImage: require('@/assets/images/ibbil/logo.svg')
    }
  }
}
</script>

<style>

</style>
