<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      تكملة البيانات
    </dashboard-page-title>

     <form @submit.prevent="save">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات السائق</h5>
                </template>
                <b-row>
                  <b-col  cols="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="userInfo.name"
                        validate="required"
                        name="id"
                        :disabled="true"
                        placeholder="أدخل الاسم" label="الإسم"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="userInfo.phone"
                        :validate="'required|numeric'"
                        name="id"
                        :disabled="true"
                        placeholder="Ex: 0109564546" label="رقم الجوال"
                    />
                  </b-col>
                  <b-col  md="4">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="userInfo.national_id"
                        :validate="'required|numeric'"
                        name="id"
                        :disabled="true"
                        placeholder="Ex: 454846511154" label="رقم الهوية"
                    />
                  </b-col>
                  <b-col  md="6">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="userInfo.address"
                        :validate="'required'"
                        name="id"
                        :disabled="false"
                        placeholder="" label="العنوان"
                    />
                  </b-col>
                  <b-col  md="6">
                    <input-form
                        class="mb-3 joining-label"
                        v-model="userInfo.email"
                        :validate="'required'"
                        name="id"
                        :disabled="true"
                        placeholder="Ex: 454846511154" label="البريد الالكترونى"
                    />
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-image"></i>  الصور</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="صورة الهوية"
                        nameOfImage="image.jpg"
                        @cropper-save="saveIdImage"
                        :progressLoading="progressIdImage"
                        :multi="false"
                        :imageUrl="driver.idImage"
                    />
                  </b-col>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="رخصة السيارة"
                        nameOfImage="image.jpg"
                        @cropper-save="saveCarLicense"
                        :progressLoading="progressCarLicense"
                        :showProgress="true"
                        :multi="false"
                        :imageUrl="driver.carLicense"
                    />
                  </b-col>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="رخصة القيادة"
                        nameOfImage="image.jpg"
                        @cropper-save="saveUserLicense"
                        :progressLoading="progressUserLicense"
                        :showProgress="true"
                        :multi="false"
                        :imageUrl="driver.userLicense"
                    />
                  </b-col>
                  <b-col md="12" class="mb-4">
                    <cropper-images
                        label="فاتورة السيارة"
                        nameOfImage="image.jpg"
                        @cropper-save="saveCarReceipt"
                        :progressLoading="progressCarReceipt"
                        :showProgress="true"
                        :multi="false"
                        :imageUrl="driver.carReceipt"
                    />
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <cropper-images
                        label="رفع الصور المتبقية"
                        @cropper-save="saveGalleryImage"
                        @remove-image="removeGalleryImage"
                        :progressLoading="loadingGallery"
                        :removeLoadingUi="removeLoadingUi"
                        :images="driver.carImages"
                    ></cropper-images>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-store"></i>مواصفات السيارة</h5>
                </template>
                <b-row>
                  <b-col md="12">
                    <textarea-form placeholder="مواصفات السيارة" v-model="driver.carDescription"  name="about" validate="required"></textarea-form>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-col md="3">
            <b-card class="iq-border-radius-10 mb-3 main-actions">
              <template v-slot:header>
                <h5 class="text-primary">
                  <i class="las la-save"></i>
                  النشر
                </h5>
              </template>
              <div v-if="loadingSubmitForm">
                <b-button variant="primary" class="w-100" disabled>
                  <spinner-loading text="يتم الحفظ"></spinner-loading>
                </b-button>
              </div>
              <div class="d-flex justify-content-end gap_1" v-else>
                  <b-button variant="primary"  class="w-100" type="submit" > حفظ </b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </form>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import settingsServices from '../services/settings'
import mainInfoMixins from '@/mixins/mainInfo'
export default {
  mixins: [mainInfoMixins],
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).data.user : {},
      driver: {
        idImage: '',
        carLicense: '',
        userLicense: '',
        carReceipt: '',
        status: 'processing',
        carDescription: '',
        carImages: []
      },
      loadingSubmitForm: false,
      loadingGallery: 0,
      removeLoadingUi: false,
      progressIdImage: 0,
      progressCarLicense: 0,
      progressUserLicense: 0,
      progressCarReceipt: 0
    }
  },
  methods: {
    saveIdImage (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressIdImage = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.idImage = res.data.url
        this.showSuccessUploadFile()
      })
    },
    saveCarLicense (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressCarLicense = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.carLicense = res.data.url
        this.showSuccessUploadFile()
      })
    },
    saveUserLicense (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressUserLicense = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.userLicense = res.data.url
        this.showSuccessUploadFile()
      })
    },
    saveCarReceipt (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressCarReceipt = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.carReceipt = res.data.url
        this.showSuccessUploadFile()
      })
    },

    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('file', data.image)
      formData.append('name', data.imageInfo.name)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingGallery = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.driver.carImages.push(res.data.url)
        this.showSuccessUploadFile()
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage () {
      console.log('Removeeeee')
    },

    save () {
      this.loadingSubmitForm = true
      settingsServices.uploadMarketplaceFiles(this.driver).then(res => {
        core.showSnackbar('success', 'Data Updated Successfully')
        this.getInfo()
      }).finally(() => {
        this.loadingSubmitForm = false
      })
    }
  }
}
</script>
<style>
.main-actions {
  position: sticky !important;
  top: 0px;
}
.deleteLabelButton {
  position: absolute;
  left: 10px;
  top: -30px;
}
</style>
