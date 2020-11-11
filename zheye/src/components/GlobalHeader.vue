<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">你好{{ user.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number
}

export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
});
</script>
