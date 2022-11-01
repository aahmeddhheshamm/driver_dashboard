// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const processing = () => import('./views/index')

// start Routes
export default [
  {
    path: '/processing',
    name: 'processing',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'processing',
      meta: {
        name: 'processing',
        parentName: 'processing',
        userType: '',
        permission: ''
      },
      component: processing
    }
    ]
  }
]
