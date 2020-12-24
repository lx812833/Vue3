<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine, Schema } from "../types";
import { defineComponent } from "vue";

// 声明全局 props
declare const props: {
  value: any
  onChange: (v: any) => void
  schema: Schema
}

export default defineComponent({
  name: "NumberFeild",
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      const num = Number(value)
      if (Number.isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return {
      handleChange
    }
  }
})
</script>
