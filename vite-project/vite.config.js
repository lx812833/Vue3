import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import postcssPxToViewport from "postcss-px-to-viewport";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const CWD = process.cwd();
  const { VITE_BASE_SYSTEM, VITE_BASE_SYSTEM_TARGET, VITE_BASE_PROMOTION, VITE_BASE_PROMOTION_TARGET } = loadEnv(mode, CWD);

  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
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
      strictPort: true, // 如果端口已占用直接退出
      // 接口代理
      proxy: {
        [VITE_BASE_SYSTEM]: {
          target: VITE_BASE_SYSTEM_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(VITE_BASE_SYSTEM, "/"),
        },
        [VITE_BASE_PROMOTION]: {
          target: VITE_BASE_PROMOTION_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(VITE_BASE_PROMOTION, "/"),
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 全局引入变量
          additionalData: `@import "@/assets/scss/variable.scss";`
        },
      },
      postcss: {
        plugins: [
          postcssPxToViewport({
            unitToConvert: "px", // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            exclude: [],
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
    }
  })
}