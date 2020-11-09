<template>
  <div>
    <h1>~{{ result }}~</h1>
    <h2>{{ error }}</h2>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, onErrorCaptured, ref } from "vue";

export default defineComponent({
  name: "AsyncShow",
  // setup() {
  //   return new Promise((resove, reject) => {
  //     setTimeout(() => {
  //       resove({
  //         result: 18,
  //       });
  //     }, 3000);
  //   });
  // },
  setup() {
    const error = ref(null);
    const getResData = async () => {
      const resData = await axios.get("https://dog.ceo/api/breeds/image");
      return resData && resData.data ? resData.data.message : "error！";
    };
    const result = getResData();
    onErrorCaptured((e) => {
      error.value = e;
      return true; // 返回一个boolean，为 true ，表示向上传递
    });
    return {
      result,
      error
    };
  },
});
</script>

<style>
</style>