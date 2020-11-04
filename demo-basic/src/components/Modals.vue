<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>teleport运用</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      // 等同于 vue2 this.$emit
      context.emit("close-modal", "close");
    };
    return {
      buttonClick
    }
  },
});
</script>

<style>
#center {
  position: fixed;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  border: 1px solid black;
}
</style>