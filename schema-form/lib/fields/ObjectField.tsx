import { defineComponent } from "vue";
import { FiledPropsDefine } from "../types";

const Schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    age: {
      type: "number"
    }
  }
}

export default defineComponent({
  name: "ObjectField",
  props: FiledPropsDefine,
  setup() {
    return () => {
      return null;
    }
  }
})