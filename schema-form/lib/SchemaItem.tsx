import { defineComponent, PropType } from "vue";
import { Schema, SchemaTypes, FiledPropsDefine } from './types';
import StringField from "./fields/StringField.vue";
import NumberField from "./fields/NumberField";

export default defineComponent({
  name: "SchemaItem",
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      const schema = props.schema;
      const type = schema?.type;
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        default: {
          console.log(`${type} is not supported`);
        }
      }
      return <Component {...props}></Component>
    }
  }
})