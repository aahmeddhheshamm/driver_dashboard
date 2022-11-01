// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const superAdminDashboard = () => import('./views/index')

// start Routes
export default [
  {
    path: '/',
    name: 'index',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'index',
      meta: {
        name: 'index',
        userType: '',
        permission: ''
      },
      component: superAdminDashboard
    }
    ]
  }
]
