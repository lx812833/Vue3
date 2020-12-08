import { defineComponent } from 'vue';
import MonacoEditor from "./components/MonacoEditor";

function handleToJson(data: any) {
  return JSON.stringify(data, null, 2);
}

const Schema = {
  type: "string"
}

export default defineComponent({
  setup() {
    return () => {
      const code = handleToJson(Schema);
      return (
        <div>
          <MonacoEditor code={code} />
        </div>
      )
    }
  }
})