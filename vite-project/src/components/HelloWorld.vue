<template>
  <p>{{ msg }}</p>

  <!-- <div class="card">
    <van-button type="primary" @click="count++">主要按钮 {{ count }}</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div> -->
</template>

<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<style lang="scss" scoped>
p {
  font-size: $font-size-medium;
  color: $color-sub-theme;
}
</style>