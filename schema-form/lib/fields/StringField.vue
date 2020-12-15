<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { FiledPropsDefine, Schema } from "../types";
import { defineComponent, ref } from "vue";
export default defineComponent({
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
