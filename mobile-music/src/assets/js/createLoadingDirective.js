/**
 * 创建loading的指令函数
 */

import { createApp } from "vue";
import { addClass, removeClass } from "@/assets/js/dom";

// Loading定位是absolute，如果父级不是 "absolute", "fixed", "relation"，则添加 g-relative 样式
const relativeCls = "g-relative";

export const createLoadingDirective = (Comp) => {
  const handleAppend = (el) => {
    const name = Comp.name;
    const style = getComputedStyle(el);
    if (["absolute", "fixed", "relation"].indexOf(style.position) === -1) {
      addClass(el, relativeCls);
    }
    // 挂载点挂载el对象
    el.appendChild(el[name].instance.$el);
  }

  const handleRemove = (el) => {
    const name = Comp.name;
    removeClass(el, relativeCls);
    el.removeChild(el[name].instance.$el);
  }

  return {
    mounted(el, binding) {
      const app = createApp(Comp);
      const name = Comp.name;
      const instance = app.mount(document.createElement("div"));
      // 处理多个指令作用于同一个对象，避免数据覆盖
      if(!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;

      const title = binding.arg; // 传递给指令的参数(如果有的话)
      console.log(title);
      if (typeof title !== "undefined") {
        instance.setLoadingTitle(title);
      }
      if (binding.value) {
        handleAppend(el);
      }
    },
    updated(el, binding) {
      const title = binding.arg;
      const name = Comp.name;
      if (typeof title !== "undefined") {
        el[name].instance.setLoadingTitle(title);
      }
      // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
      if (binding.value !== binding.oldValue) {
        binding.value ? handleAppend(el) : handleRemove(el);
      }
    },
  }
}