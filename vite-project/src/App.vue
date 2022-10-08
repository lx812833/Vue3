<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/images/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/images/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <br>
  <br>
  <br>
  <ReactBlock />
</template>

<script setup>
import { onMounted } from "vue";
import { useTestStore } from "@/store/test";
import HelloWorld from "@/components/helloWorld.vue";
import ReactBlock from "@/components/rectBlock.vue";

onMounted(() => {
  // const testStore = useTestStore();
  // testStore.handleLogin();
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
