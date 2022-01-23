import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("../views/recommend.vue")
  },
  {
    path: "/singer",
    name: "Singer",
    component: () => import("../views/singer.vue"),
    children: [
      {
        path: ":id",
        component: () => import("../views/singerDetail.vue")
      }
    ]
  },
  {
    path: "/top-list",
    name: "TopList",
    component: () => import("../views/topList.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/search.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
