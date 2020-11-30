import { createRouter, createWebHistory } from "vue-router";
import Home from "./view/Home.vue";
import Login from "./view/Login.vue";
import ColumnDetail from "./components/ColumnDetail.vue";
import createPost from "./view/CreatePost.vue";
import store from './store';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      meta: {
        redirectAlreadyLogin: true
      },
      component: Login
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail
    },
    {
      path: "/create",
      name: "create",
      meta: {
        requiredLogin: true
      },
      component: createPost
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: "login" });
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next("/");
  } else {
    next();
  }
})

export default router;