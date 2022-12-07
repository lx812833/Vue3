export const basicRoutes = [
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },
  {
    name: 'Dashboard',
    path: '/',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: 'Dashboard',
    },
  },
  {
    name: 'Unocss',
    path: '/unocss',
    component: () => import('@/views/unocss/index.vue'),
    meta: {
      title: '测试unocss',
    },
  },
]