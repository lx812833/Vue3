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
  props: {
    rules: Array as PropType<RuleProps>,
  },
  setup(props, context) {
    const inputRef = reactive({
      val: "",
      error: false,
      message: "",
    });
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
      }
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