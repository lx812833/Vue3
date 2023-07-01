import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "lx",
    count: 0,
  }),
  actions: {
    setCount() {
      this.count++;
    },
  }
})