// loading自定义指令

import { createApp } from "vue";
import Loading from "./loading";
import { addClass, removeClass } from "@/assets/js/dom";

// Loading定位是absolute，如果父级不是 "absolute", "fixed", "relation"，则添加 g-relative 样式
const relativeCls = "g-relative";

export const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    const title = binding.arg; // 传递给指令的参数(如果有的话)
    if(typeof title !== "undefined") {
      instance.setLoadingTitle(title);
    }

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
  const style = getComputedStyle(el);
  if(["absolute", "fixed", "relation"].indexOf(style.position) === -1) {
    addClass(el, relativeCls);
  }
  // 挂载点挂载el对象
  el.appendChild(el.instance.$el);
}

const handleRemove = (el) => {
  removeClass(el, relativeCls);
  el.removeChild(el.instance.$el);
}