// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const withdrawProcess = () => import('./views/index')

// start Routes
export default [
  {
    path: '/withdrawProcess',
    name: 'withdrawProcess',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'withdrawProcess',
      meta: {
        name: 'withdrawProcess',
        parentName: 'withdrawProcess',
        userType: '',
        permission: ''
      },
      component: withdrawProcess
    }
    ]
  }
]
