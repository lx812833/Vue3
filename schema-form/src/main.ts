import { createApp, defineComponent, h } from 'vue';
import HelloWorld from "@/components/HelloWorld.vue";
const img = require("./assets/logo.png");
// import App from "./App.vue";

const App = defineComponent({
  render() {
    /**
     * 节点类型  节点属性  子节点
     */
    return h("div", { id: "app" }, [
      h("img", {
        alt: "Vue logo",
        src: img
      }),
      h(HelloWorld, {
        msg: "Welcome to Your Vue.js + TypeScript App",
        age: 12
      })
    ])
  }
})

createApp(App).mount("#app");
