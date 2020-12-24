import { defineComponent } from "vue";
import { FiledPropsDefine, Schema } from '../types';
import { useVJSFContext } from "../context";

export default defineComponent({
  name: "ArrayField",
  props: FiledPropsDefine,

  setup(props) {
    const context = useVJSFContext();
    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props;
      const array = Array.isArray(value) ? value : [];
      array[index] = v;
      props.onChange(array);
    }
    return () => {
      const { schema, rootSchema, value } = props;
      const SchemaItem = context.SchemaItem;
      const isMultiType = Array.isArray(schema.items);
      if(isMultiType) {
        const items: Schema[] = schema.items as any;
        const array = Array.isArray(value) ? value : [];
        return items.map((s: Schema, index: number) => {
          <SchemaItem 
            schema={s}
            rootSchema={rootSchema} 
            value={array[index]}
            onChange={(v: any) => handleMultiTypeChange(v, index)}
            key={index}
          ></SchemaItem>
        })
      } else {
        return (
          <div>ArrayField</div>
        )
      }
    }
  }
})