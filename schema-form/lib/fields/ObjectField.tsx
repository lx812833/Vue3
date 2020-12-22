import { defineComponent, inject, DefineComponent } from "vue";
import { FiledPropsDefine, Schema } from '../types';
import { SchemaFormContextKey } from "../context";
import { isObject } from '../utils';

const TypeHelperComponent = defineComponent({
  props: FiledPropsDefine
})
type SchemaItemDefine = typeof TypeHelperComponent;

export default defineComponent({
  name: "ObjectField",
  props: FiledPropsDefine,
  setup(props) {
    // inject获取provide传递的SchemaItem组件
    const context: { SchemaItem: SchemaItemDefine } | undefined = inject(SchemaFormContextKey);
    if (!context) {
      throw Error("SchemaItem should be used");
    }
    const handleObjectFieldChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {};
      if (v === undefined) {
        delete value[k];
      } else {
        value[k] = v;
      }
      props.onChange(value);
    }

    return () => {
      const { schema, rootSchema, value } = props;
      const { SchemaItem } = context;
      const properties = schema.properties || {};
      const currentVal: any = isObject(value) ? value : {};
      return (
        Object.keys(properties).map((k: string, index: number) => {
          console.log("object", k);
          <SchemaItem
            schema={properties[k]} 
            rootSchema={rootSchema} 
            value={currentVal} 
            key={index} 
            onChange={(v: any) => handleObjectFieldChange(k, v)}
          />
        })
      );
    }
  }
})