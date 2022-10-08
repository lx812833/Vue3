import { defineStore } from "pinia";
import { getToken, bankList } from "@/api";
import { setToken } from "@/utils/auth";

export const useTestStore = defineStore("test", {
  /**
   * 开启数据缓存：（可自定义 key、持久化部分 state）
   * https://juejin.cn/post/7049196967770980389
   */

  persist: {
    enabled: true
  },
  state: () => {
    return {
      name: "张三",
      age: 18
    }
  },
  // 可通过 actions来修改state，且可通过this访问state
  actions: {
    async handleLogin() {
      const res = await getToken();
      setToken(res.token);
      await bankList();
    },
    updateAge() {
      this.age = this.age + 1;
    }
  },
  getters: {
    fullName(state) {
      return `${state.name}丰`;
    }
  }
})