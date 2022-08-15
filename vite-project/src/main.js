import { createApp } from "vue";
import App from "./App.vue";
import { Button } from "vant";

// 全局样式文件
import "@/assets/scss/index.scss";

createApp(App).use(Button).mount("#app");
