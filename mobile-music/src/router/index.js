import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import(/* webpackChunkName: "Recommend" */ "../views/recommend.vue")
  },
  {
    path: "/singer",
    name: "Singer",
    component: () => import(/* webpackChunkName: "Singer" */ "../views/singer.vue")
  },
  {
    path: "/top-list",
    name: "TopList",
    component: () => import(/* webpackChunkName: "TopList" */ "../views/topList.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import(/* webpackChunkName: "TopList" */ "../views/search.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
