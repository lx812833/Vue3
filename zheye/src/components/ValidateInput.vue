<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <span class="invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RuleProps = RuleProp[];

export default defineComponent({
  name: "ValidateInput",
  /**
   * inheritAttrs: false 设置为false，不希望组件的根元素继承 attribute（属性）
   * inheritAttrs: false 和 $attrs，可以手动决定这些 attribute 会被赋予哪个元素
   */
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RuleProps>,
  },
  setup(props, context) {
    const inputRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    console.log("attrs", context.attrs);
    const validateInput = () => {
      if (props.rules) {
        const allPased = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPased;
        return allPased;
      }
      return true;
    };

    return {
      inputRef,
      validateInput,
    };
  },
});
</script>

<style>
</style>