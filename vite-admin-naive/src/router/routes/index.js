export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    isHidden: true,
  },
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

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

// modules文件夹下的路由都会作为动态路由
const modules = import.meta.globEager('./modules/*.js');
const asyncRoutes = [];
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default);
})

export { asyncRoutes };