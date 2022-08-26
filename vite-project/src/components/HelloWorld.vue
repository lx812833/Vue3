<template>
  <p>{{ msg }}</p>
  <p>{{ testStore.age }}</p>
  <p>storeToRefs：{{ age }}</p>
  <p>computed：{{ name }}</p>
  <p>getters：{{ testStore.fullName }}</p>

  <div class="card">
    <van-button type="primary" @click="count++">主要按钮 {{ count }}</van-button>
    <van-button type="success" @click="changeTestAge">成功按钮</van-button>
    <!-- <van-button type="default">默认按钮</van-button> -->
    <!-- <van-button type="warning">警告按钮</van-button> -->
    <!-- <van-button type="danger">危险按钮</van-button> -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";

defineProps({
  msg: String,
});

const testStore = useTestStore();
// 使用pinia storeToRefs 解构赋值具有响应性
const { age } = storeToRefs(testStore);
const name = computed(() => testStore.name);

const count = ref(0);

const changeTestAge = () => {
  testStore.updateAge();
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 25px;
  font-size: $font-size-medium;
  color: $color-sub-theme;
}
</style>