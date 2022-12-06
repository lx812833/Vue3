import { defineConfig, loadEnv } from 'vite';
import path from 'path';

import { createVitePlugins } from './build/plugin';
import { wrapperEnv, createProxy } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  // 获取定义的环境变量，也可以使用process.env.xxx 这种方式进行访问
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH || '/',
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        // 全局 scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    server: {
      host: '0.0.0.0',  // 默认为'127.0.0.1'
      port: VITE_PORT,  // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    }
  }
})