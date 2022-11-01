import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/modules/auth/auth.routes'
import dashboardRoutes from '@/modules/dashboard/dashboard.routes'
import settingsRoutes from '@/modules/settings/settings.routes'
import tripsRoutes from '@/modules/trips/trips.routes'
import withdrawProcess from '@/modules/withdrawProcess/withdrawProcess.routes.'
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')

Vue.use(VueRouter)

const routes = [
  ...auth,
  ...dashboardRoutes,
  ...settingsRoutes,
  ...withdrawProcess,
  ...tripsRoutes,
  {
    path: '*',
    name: 'errorPage',
    meta: { name: 'dashboard', userType: 'both' },
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// router.beforeEach((to, from, next) => {
//   console.log('Hello')
//   next(vm => {
//     console.log('vm.checkIfLogin() => ', vm.checkIfLogin())
//     if (!vm.checkIfLogin()) {
//       vm.logout()
//     } else next()
//   })
// })
/* router.beforeEach((to, from, next) => {
    next(vm => {
      if (!vm.checkIfLogin()) {
        next({ name: 'login' })
      } else next()
    })
  if (to.meta.userType === 'both') {
    next()
  } else if (securityFunctions.methods.isAdmin(to.meta.userType)) {
    if (securityFunctions.methods.hasPer(to.meta.permission)) {
      next()
    } else {
      debugger
      next({ name: 'errorPage' })
    }
  } else {
    if (securityFunctions.methods.hasServiceType(to.meta.serviceTypes) || to.meta.serviceTypes === 'all') {
      next()
    } else {
      debugger
      next({ name: 'errorPage' })
    }
  }
}) */
export default router
