import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "lx",
    isAdmin: true,
  }),
  actions: {
    logout() {
      this.$patch({
        name: "",
        isAdmin: false,
      })
    },
  }
})