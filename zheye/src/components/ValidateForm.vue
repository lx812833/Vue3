<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
/**
 * emitter: 使用 mitt 创建监听器，用于父子组件间通信
 */
import mitt from "mitt";
export const emitter = mitt();
type validateFunc = () => boolean;

export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: validateFunc[] = [];
    emitter.on("form-item-created", val => {
      funcArr.push(val);
    });
    const submitForm = () => {
      /**
       * 这里 funcArr 是传递过来的validateInput验证函数，执行后返回Boolean值
       * 再由map遍历为布尔数组（因要一次性执行多个输入框），再every()
       */
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);
    };
    onUnmounted(() => {
      emitter.all.clear();
      funcArr = [];
    });

    return {
      submitForm,
    };
  },
});
</script>

<style>
</style>