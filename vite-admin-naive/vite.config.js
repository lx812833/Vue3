import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  // 获取定义的环境变量，也可以使用process.env.xxx 这种方式进行访问
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH || '/',
    plugins: [vue()],
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
  }
})