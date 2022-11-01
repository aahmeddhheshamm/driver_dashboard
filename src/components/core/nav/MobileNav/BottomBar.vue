<template>
  <div class="bottom-bar py-1">
    <ul class="d-flex justify-items-between align-items-center p-0 mb-0">
      <li @click="tab = 'الحساب'" :class="tab == 'الحساب' ? 'active' : ''" class="d-flex flex-column align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.902"
          height="22.959"
          viewBox="0 0 17.902 22.959"
        >
          <g id="user" transform="translate(0)">
            <path
              id="Path_164"
              data-name="Path 164"
              d="M9.087,314.184a7.1,7.1,0,0,1-8.935,0,8.957,8.957,0,0,0-4.484,7.754v3.239a.694.694,0,0,0,.694.694H12.877a.694.694,0,0,0,.694-.694v-3.239a8.956,8.956,0,0,0-4.483-7.754Zm0,0"
              transform="translate(4.331 -302.913)"
              fill="#fff"
            />
            <path
              id="Path_165"
              data-name="Path 165"
              d="M96.887,5.731a5.731,5.731,0,1,0-5.731,5.731A5.738,5.738,0,0,0,96.887,5.731Zm0,0"
              transform="translate(-82.205)"
              fill="#fff"
            />
          </g>
        </svg>

        <span>الحساب</span>
      </li>
      <li @click="tab = 'الخدمات'" :class="tab == 'الخدمات' ? 'active' : ''" class="d-flex flex-column align-items-center justify-content-center">
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="25"
          height="25"
          viewBox="0 0 19 19"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="Rectangle_505"
                data-name="Rectangle 505"
                width="22"
                height="19"
                fill="none"
              />
            </clipPath>
          </defs>
          <g
            id="Group_245"
            data-name="Group 245"
            transform="translate(0.495 0.495)"
          >
            <g
              id="Group_245-2"
              data-name="Group 245"
              transform="translate(-0.495 -0.495)"
              clip-path="url(#clip-path)"
            >
              <path
                id="Path_175"
                data-name="Path 175"
                d="M71.373,91.45c-.1.764-.092,1.587-.153,1.852-.113.48-.76,2.957-.76,2.957h1.564a12.258,12.258,0,0,0,.182-2.43c-.023-.245-.833-2.38-.833-2.38"
                transform="translate(-59.916 -77.896)"
                fill="#fff"
              />
              <path
                id="Path_176"
                data-name="Path 176"
                d="M87.828,75.4c-.191.09-.456.227-.824.432a4.5,4.5,0,0,1-2.714.472c-.539-.01-.857,0-1.12.007l.674,3.617c-.1.7-.087,2.583-.087,2.583H86.9A1.306,1.306,0,0,0,88.2,81.2c0-.738-.009-1.514-.009-1.72,0-.392-.368-4.08-.368-4.081"
                transform="translate(-70.803 -64.147)"
                fill="#fff"
              />
              <path
                id="Path_177"
                data-name="Path 177"
                d="M15.156,0H2.764A2.764,2.764,0,0,0,0,2.764V15.156A2.764,2.764,0,0,0,2.764,17.92h6.6A24.505,24.505,0,0,0,9.9,14.962l-.067-2a6.466,6.466,0,0,0-.853-2.106c-.245-.582-.9-.595-1.694-.454A2.552,2.552,0,0,1,4.792,9.391,9.563,9.563,0,0,1,3.515,6.9a8.918,8.918,0,0,1-1.164-.245,1.422,1.422,0,0,0-.85.023.556.556,0,0,1-.315.036c-.237-.07-.211-.232-.211-.232a.676.676,0,0,1,.079-.82,1.077,1.077,0,0,1,.585-.5c.394-.118,1.578-.417,1.578-.417A1.471,1.471,0,0,1,3.95,4.49a.622.622,0,0,0,.45-.222.67.67,0,0,1,.249-.211c.3-.079.368.106.224.262-.095.1-.086.624-.086.624.571.71.985,1.667,1.5,2.256h0a.192.192,0,0,0,.237.039,3.552,3.552,0,0,0,.734-.54A11.635,11.635,0,0,1,9.74,5.676c.421-.2,1.418-1.888,3.048-1.888,1.426,0,2.887,1.358,3.532,2.041a1.645,1.645,0,0,0,.787.463,1.992,1.992,0,0,1,.813.41V2.764A2.764,2.764,0,0,0,15.156,0"
                transform="translate(0.443 0.443)"
                fill="#fff"
              />
            </g>
          </g>
        </svg>
        <span>الخدمات</span>
      </li>
      <li @click="tab =' انضم كتاجر'" :class="tab == 'انضم كتاجر' ? 'active' : ''"
        class="
          d-flex
          flex-column
          align-items-center
          justify-content-center
          join-vendor
        "
      >
        <span>انضم</span>
        <span>كتاجر</span>
      </li>
      <li @click="tab = 'المتاجر'" :class="tab == 'المتاجر' ? 'active' : ''" class="d-flex flex-column align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="25"
          height="25"
          viewBox="0 0 20 20"
        >
          <image
            id="vendor_copy"
            data-name="vendor copy"
            width="20"
            height="20"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuNTY2ZWJjNSwgMjAyMi8wNS8wOS0wNzoyMjoyOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNy0wNVQxNDo1Mjo1MiswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDctMDVUMTQ6NTU6NDArMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDctMDVUMTQ6NTU6NDArMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUyYmFkMDc0LTBhNWEtNjM0OC04ZTFiLTU5MjVjYzk3OTIxYSIgeG1wTU06RG9jdW1lbnRJRD0i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"
          />
        </svg>

        <span>المتاجر</span>
      </li>
      <li @click="tab = 'السلة'" :class="tab == 'السلة' ? 'active' : ''" class="d-flex flex-column align-items-center justify-content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="25"
          viewBox="0 0 22.523 20.02"
        >
          <path
            id="Icon_awesome-shopping-cart"
            data-name="Icon awesome-shopping-cart"
            d="M1.872,11.782.024,3.649A.938.938,0,0,1,.939,2.5H16.3L16.656.75A.938.938,0,0,1,17.575,0h4.009a.938.938,0,0,1,.938.938v.626a.938.938,0,0,1-.938.938H18.852L16.105,15.932a2.19,2.19,0,1,1-2.622.335h-8.2A2.189,2.189,0,1,1,2.8,15.86l-.216-.949A.938.938,0,0,1,3.5,13.764h10.5l.256-1.251H2.787A.938.938,0,0,1,1.872,11.782Z"
            transform="translate(0)"
            fill="#fff"
          />
        </svg>
        <span>السلة</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: ''
    }
  }
}
</script>

<style lang="scss">
.bottom-bar {
  position: fixed;
  bottom: 30px;
  width: 90%;
  transform: translateX(-5%);
  color: #fff;
  background: rgba( 43, 88, 66, 0.5 );
  backdrop-filter: blur( 20px );
  -webkit-backdrop-filter: blur( 20px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 20px;
  z-index: 55;
  ul {
    li {
      position: relative;
      flex-grow: 1;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:not(.join-vendor){
        &::before{
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fff;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
        }
      }
      &.active{
        transform: translateY(-8px);
         &::before{
          opacity: 1;
          visibility: visible;
        }
      }
      svg{
        width: 22px;
        height: 22px;
      }
      &.join-vendor {
        flex-grow: unset;
        background: var(--iq-primary);
        width: 70px;
        height: 70px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        border: 4px solid #fff;
        transform: translateY(-20px);
      }
    }
  }
}
</style>
