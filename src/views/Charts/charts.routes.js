const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout')

/*
const amChart = () => import('./AmCharts')
const apexChart = () => import('./ApexCharts')
*/

const HighCharts = () => import('./AmCharts')

export default [
  {
    path: '/amChart',
    name: 'amChart',
    component: dashboardLayout,
    meta: { auth: true },
    children: [{
      path: '',
      name: 'amChart',
      meta: { auth: true, name: 'amChart' },
      component: HighCharts
    }
    ]
  }

]
