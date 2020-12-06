import { createApp, defineComponent, h, reactive, ref } from 'vue';
// import App from "./App.vue";
import App from "./APP"; // App.tsx

/**
 * setup 中使用render函数
 * 
import HelloWorld from "@/components/HelloWorld.vue";
const img = require("./assets/logo.png");

const App = defineComponent({
  // setup只会在组件渲染时执行一次
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
      // 节点类型  节点属性  子节点（数组）
      return h("div", { id: "app" }, [
        h("img", {
          alt: "Vue logo",
          src: img
        }),
        h(HelloWorld, {
          msg: "Welcome to Your Vue.js + TypeScript App",
          age: 12
        }),
        h("p", state.name + number)
      ])
    }
  }
})
*/


createApp(App).mount("#app");
