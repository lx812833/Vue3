import { defineComponent, PropType, provide } from 'vue';
import { Schema } from "./types";
import SchemaItem from "./SchemaItem";
import { SchemaFormContextKey } from "./context";

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
    const context: any = {
      SchemaItem
    }
    // provide向子节点提供SchemaItem组件
    provide(SchemaFormContextKey, context);

    return () => {
      const { schema, value } = props;
      return <SchemaItem schema={schema} rootSchema={schema} value={value} onChange={handleChange}></SchemaItem>
    }
  }
})