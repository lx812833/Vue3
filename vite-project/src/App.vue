<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/images/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/images/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <h3>{{ number }}</h3>
  </div>
  <HelloWorld
    ref="hello"
    msg="Vite + Vue"
    @increase="increaseNumber"
    @update="updateNumber"
  />
  <br />
  <br />
  <br />
  <ReactBlock />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTestStore } from "@/store/test";
import HelloWorld from "@/components/helloWorld.vue";
import ReactBlock from "@/components/rectBlock.vue";

const hello = ref(null);
const number = ref(0);

const increaseNumber = () => {
  number.value += 1;
};

const updateNumber = (val) => {
  number.value = val;
  
  const { age, name, count } = hello.value;
  console.log("hello2", age, name, count);
};

onMounted(() => {
  const { age, name, count } = hello.value;
  console.log("hello1", age, name, count);
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
h3 {
  margin: 20px auto;
  color: aqua;
}
</style>
