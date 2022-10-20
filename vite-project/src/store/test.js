import { defineStore } from "pinia";
import { getToken, bankList } from "@/api";
import { setToken } from "@/utils/auth";

export const useTestStore = defineStore("test", {
  /**
   * 开启数据缓存：（可自定义 key、持久化部分 state）
   * 
   * persist: {
      enabled: true，
      strategies: [
        {
          key: 'myCounter', // 存储的 key 值，默认为 storeId
          storage: localStorage, // 存储的位置，默认为 sessionStorage
          paths: ['name', 'age'], // 需要存储的 state 状态，默认存储所有的状态
        }
      ]
    }
   * 
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