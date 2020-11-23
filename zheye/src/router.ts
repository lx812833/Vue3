import { createRouter, createWebHistory } from "vue-router";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/home",
      name: "home",
      component: resolve => require(["./view/Home.vue"], resolve)
    }
  ]
})

export default router;