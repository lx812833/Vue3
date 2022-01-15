// loading自定义指令

import { createApp } from "vue";
import Loading from "./loading";

export const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    if (binding.value) {
      handleAppend(el);
    }
  },
  updated(el, binding) {
    // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
    if (binding.value !== binding.oldValue) {
      binding.value ? handleAppend(el) : handleRemove(el);
    }
  },
}

const handleAppend = (el) => {
  // 挂载点挂载el对象
  el.appendChild(el.instance.$el);
}

const handleRemove = (el) => {
  el.removeChild(el.instance.$el);
}