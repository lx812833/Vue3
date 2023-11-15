import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/record",
    name: "record",
    component: () => import("@/views/record/index.vue")
  },
  {
    path: "/apply",
    name: "apply",
    component: () => import("@/views/apply/index.vue")
  },
  {
    path: "/iframe",
    name: "iframe",
    component: () => import("@/views/iframe/index.vue")
  },
  {
    path: "/",
    redirect: "/home"
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth"
    }
  }
})

export default router;
