// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const trips = () => import('./views/index')

// start Routes
export default [
  {
    path: '/trips',
    name: 'trips',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'trips',
      meta: {
        name: 'trips',
        parentName: 'trips',
        userType: '',
        permission: ''
      },
      component: trips
    }
    ]
  }
]
