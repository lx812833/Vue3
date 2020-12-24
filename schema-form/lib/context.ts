import { inject } from "vue";
import { CommonFieldType } from "./types";

export const SchemaFormContextKey = Symbol();

export function useVJSFContext() {
    // inject获取provide传递的SchemaItem组件
    const context: { SchemaItem: CommonFieldType } | undefined = inject(SchemaFormContextKey);
    if (!context) {
      throw Error("SchemaItem should be used");
    }
    return context;
}