import { defineComponent, PropType } from 'vue';
import { Schema, SchemaTypes } from "./types";
import SchemaItem from "./SchemaItem";

export default defineComponent({
  name: "SchemaForm",
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props, { slots, emit }) {
    const handleChange = (v: any) => {
      props.onChange(v);
    }
    return () => {
      const { schema, value } = props;
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}></SchemaItem>
    }
  }
})