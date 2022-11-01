<template>
  <div class="example-wrapper">
    <label class="mb-2">{{label}}</label>
    <div class="mb-3 d-flex align-items-center flex" v-if="imageUrl && !multi">
      <div class="img-fluid avatar-70 w-20 h-20 rounded finalImage"
           :style="{ 'background-image': 'url(' + imageUrl + ')' }"></div>
      <div class="d-flex justify-content-between position-relative flex-grow-1">
        <section>
          <span class="text-dark ml-3 font-weight-bold">{{nameOfImage}}</span>
        </section>
        <section>
          <span class="cursor-pointer text-bold font-size-12" @click="$refs.file.click()">
              <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
              Change</span>
        </section>
      </div>
    </div>
    <div v-if="images">
      <div class="mb-3 d-flex align-items-center"  v-for="(image, key) in images" :key="key">
        <div class="img-fluid avatar-70 w-20 h-20 rounded finalImage"
             :style="{ 'background-image': 'url(' + image + ')' }"></div>
        <div class="d-flex justify-content-between position-relative flex-grow-1">
          <section>
            <span class="text-dark ml-3 font-weight-bold">{{image.name}}</span>
          </section>
          <section>
            <span class="cursor-pointer text-bold text-danger font-size-12" @click="removeImage(image.id)" v-if="multi">Remove</span>
          </section>
        </div>
      </div>
    </div>
    <div class="mb-3 d-flex align-items-center" v-if="finalImage && !removeLoadingUi">
      <div class="img-fluid avatar-70 w-20 h-20 rounded finalImage"
           :style="{ 'background-image': 'url(' + showImage + ')' }"></div>
      <div class="d-flex justify-content-between position-relative flex-grow-1">
        <section>
          <span class="text-dark ml-3 font-weight-bold">{{image.name}}</span>
        </section>
        <section>
          <span v-if="progressLoading == 100">
            <span class="cursor-pointer text-bold text-danger font-size-12" v-if="multi">Remove</span>
            <span class="cursor-pointer text-bold font-size-12" v-else @click="$refs.file.click()">
              <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
              Change</span>
          </span>
          <span class="cursor-pointer text-bold" v-else>
            <span v-if="showProgress">
              Uploading {{progressLoading}}%
              </span>
          </span>
        </section>
        <section v-if="showProgress" class="position-absolute w-100" style="bottom: -9px;padding-left: 15px;">
          <b-progress :value="progressLoading" :max="100" animated
                      variant="primary" style="height: 0.25rem !important;"></b-progress>
        </section>
      </div>
    </div>
    <div v-if="!(!multi && (image.src || imageUrl))"
         class="button-wrapper mb-3 d-flex flex-column justify-content-center align-items-center p-4">
      <b-button variant="warning text-white rounded-0 px-4" @click="$refs.file.click()">
        <input type="file" v-show="false" ref="file" @change="loadImage($event)" accept="image/*">
        + Add image
      </b-button>
      <p class="m-0 p-0"> <i class="las la-cloud-upload-alt font-size-18 mr-1"></i> You can also drop your files here.
      </p>
    </div>
    <b-card v-show="showPopup" class="w-100 m-auto card" id="uploadImageCropper">
      <div class="actions d-flex justify-content-between align-items-center mb-3">
        <div class="left d-flex gap-2">
          <button class="square-button"  @click.prevent="zoom(2)">
            <img :src="require('@/assets/images/icons/zoom-in.svg')" />
          </button>
          <button class="square-button"  @click.prevent="zoom(0.5)">
            <img :src="require('@/assets/images/icons/zoom-out.svg')" />
          </button>
          <button class="square-button"  @click.prevent="flip(true, false)">
            <img :src="require('@/assets/images/icons/flip-horizontal.svg')" />
          </button>
          <button class="square-button"  @click.prevent="flip(false, true)">
            <img :src="require('@/assets/images/icons/flip-vertical.svg')" />
          </button>
          <button class="square-button"  @click.prevent="rotate(90)">
            <img :src="require('@/assets/images/icons/rotate-clockwise.svg')" />
          </button>
          <button class="square-button"  @click.prevent="rotate(-90)">
            <img :src="require('@/assets/images/icons/rotate-counter-clockwise.svg')" />
          </button>
        </div>
        <div class="right">
          <button class="square-button text-white px-4 font-weight-bold" @click.prevent="crop">Save</button>
        </div>
      </div>
      <div class="upload-example">
        <cropper
            ref="cropper"
            class="upload-example-cropper"
            :src="image.src"
            :stencil-props="ratio"
            :resize-image="{
                adjustStencil: true,
              }"
            default-boundaries="fill"
            image-restriction="fit-area"
        />
      </div>
    </b-card>
  </div>
  <!--  <cropper
        v-if="img"
        :src="img"
        :stencil-size="{
          width: 280,
          height: 280
        }"
        :stencil-props="{
          handlers: {},
          movable: false,
          resizable: false,
          aspectRatio: 1,
        }"
        image-restriction="stencil"
        @change="change"
    />-->
</template>
<script>
import 'vue-advanced-cropper/dist/style.css'
import { Cropper } from 'vue-advanced-cropper'
// This function is used to detect the actual image type,
function getMimeType (file, fallback = null) {
  const byteArray = (new Uint8Array(file)).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}
export default {
  components: {
    Cropper
  },
  props: {
    progressLoading: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 2 / 1
    },
    label: {
      type: String,
      default: ''
    },
    multi: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    nameOfImage: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      required: false
    },
    removeLoadingUi: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      showPopup: false,
      image: {
        src: null,
        type: '',
        name: ''
      },
      showImage: '',
      finalImage: '',
      newName: ''
    }
  },
  methods: {
    reset () {
      this.image = {
        src: null,
        type: null
      }
    },
    loadImage (event) {
      const { files } = event.target
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src)
        }
        this.newName = files[0].name
        const blob = URL.createObjectURL(files[0])
        const reader = new FileReader()
        reader.onload = (e) => {
          this.image = {
            src: blob,
            type: getMimeType(e.target.result, files[0].type),
            name: this.image.name
          }
          this.showPopup = true
          this.removeLoadingUi = false
        }
        reader.readAsArrayBuffer(files[0])
      }
    },
    zoom (factor) {
      this.$refs.cropper.zoom(factor)
    },
    move (direction) {
      if (direction === 'left') {
        this.$refs.cropper.move(-this.size.width / 4)
      } else if (direction === 'right') {
        this.$refs.cropper.move(this.size.width / 4)
      } else if (direction === 'top') {
        this.$refs.cropper.move(0, -this.size.height / 4)
      } else if (direction === 'bottom') {
        this.$refs.cropper.move(0, this.size.height / 4)
      }
    },
    flip (x, y) {
      this.$refs.cropper.flip(x, y)
    },
    rotate (angle) {
      this.$refs.cropper.rotate(angle)
    },
    crop () {
      this.image.name = this.newName
      const { canvas } = this.$refs.cropper.getResult()
      canvas.toBlob(blob => {
        this.finalImage = blob
        const obj = { image: blob, imageInfo: this.image }
        this.$emit('cropper-save', obj)
        this.showImage = canvas.toDataURL()
      }, this.image.type)
      this.showPopup = false
    },
    removeImage (id) {
      this.$emit('remove-image', id)
    }
  },
  destroyed () {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src)
    }
  }
}
</script>
<style lang="scss">
.finalImage {
  background-repeat: no-repeat;
  background-size: contain;
  background-color: black;
  background-position: center;
}
.example-wrapper {
  position: relative;
  user-select: none;
}
.button-wrapper {
  gap: 8px;
  border: 2px dashed #D2D2D2;
}
.rotate-image-example {
  .cropper {
    max-height: 500px;
  }
}
.actions .left{
  gap: 2px;
}
.square-button {
  background: #FE9E12;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.5s;
  &:hover {
    background: rgba(254, 158, 18, 0.55);
  }
}
</style>
