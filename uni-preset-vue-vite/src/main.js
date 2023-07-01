import App from "./App.vue";
import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import { createUnistorage } from "pinia-plugin-unistorage";

export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
  // 数据持久化操作
	pinia.use(createUnistorage);
	app.use(pinia);

	return {
		app,
	};
}
