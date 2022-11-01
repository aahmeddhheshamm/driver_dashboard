// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const setting = () => import('./views/index')

// start Routes
export default [
  {
    path: '/setting',
    name: 'setting',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'setting',
      meta: {
        name: 'setting',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: setting
    }
    ]
  }
]
