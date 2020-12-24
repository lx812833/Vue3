import { defineComponent, PropType, computed } from 'vue';
import { Schema, SchemaTypes, FiledPropsDefine } from './types';
import StringField from "./fields/StringField.vue";
import NumberField from "./fields/NumberField.vue";
import ObjectField from "./fields/ObjectField";
import ArrayField from "./fields/ArrayField";
import { retrieveSchema } from "./utils";

export default defineComponent({
  name: "SchemaItem",
  props: FiledPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      // computed 返回一个 ref
      const { schema, rootSchema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    })
    return () => {
      const { schema } = props;
      const retrievedSchema = retrievedSchemaRef.value;
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
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
          break;
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField;
          break;
        }
        default: {
          console.log(`${type} is not supported`);
        }
      }
      return <Component {...props} schema={retrievedSchema}></Component>
    }
  }
})