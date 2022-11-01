// Layout

const login = () => import('./views/loginPage')

// start Routes
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      name: 'login',
      userType: '',
      permission: '',
      breadCrumb: []
    },
    component: login
  }
]
