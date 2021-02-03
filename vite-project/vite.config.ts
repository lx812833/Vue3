import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    "@": path.resolve(__dirname, "src"),
    "comps": path.resolve(__dirname, "src/components"),
  },
  plugins: [vue()],
})
