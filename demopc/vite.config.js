import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const CWD = process.cwd();
  const { VITE_BASE_SYSTEM, VITE_BASE_SYSTEM_TARGET } = loadEnv(mode, CWD);

  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: "/src"
        }
      ]
    },
    // 服务设置
    server: {
      host: true,
      port: 8080,
      open: true,
      cors: true, // 跨域设置允许
      proxy: {
        [VITE_BASE_SYSTEM]: {
          target: VITE_BASE_SYSTEM_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(VITE_BASE_SYSTEM, "/"),
        },
      },
    },
  })
}
