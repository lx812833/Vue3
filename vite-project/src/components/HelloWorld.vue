<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>

<style lang="less" scoped>
.container h1 {
  color: #42b983;
}
</style>
