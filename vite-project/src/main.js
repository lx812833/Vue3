import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { Button } from "vant";

// 全局样式文件
import "@/assets/scss/index.scss";

createApp(App).use(store).use(Button).mount("#app");
