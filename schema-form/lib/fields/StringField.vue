<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine, Schema } from "../types";
import { defineComponent, ref } from "vue";

// 声明全局 props
declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}

export default defineComponent({
  name: "StringField",
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value);
    }
    return {
      handleChange
    }
  }
})

</script>
