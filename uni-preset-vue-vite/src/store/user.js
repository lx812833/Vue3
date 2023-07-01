import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      name: "lx",
    }
  }),
  actions: {
    setUserInfo(data) {
      this.userInfo = { ...data };
    },
  }
})