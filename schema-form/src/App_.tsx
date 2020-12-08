import { defineComponent, h, reactive, ref } from 'vue';
import HelloWorld from "@/components/HelloWorld.vue";
const img = require("./assets/logo.png");

function renderHelloWorld(str: string) {
  return <HelloWorld msg={str} />
}

export default defineComponent({
  setup() {
    const state = reactive({
      name: "lx"
    })
    const numRef = ref<number>(1);

    setInterval(() => {
      state.name += "1";
      numRef.value += 1;
    }, 10000000);

    return () => {
      const number = numRef.value;
      return (
        <div id="app">
          <img src={img} alt="Vue logo" srcset="" />
          {renderHelloWorld("Vue3.0中使用jsx")}
          <p>{state.name + number}</p>
        </div>
      )
    }
  }
})