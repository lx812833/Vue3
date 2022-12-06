import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd())
//   const viteEnv = wrapperEnv(env)

//   // 这样就可以拿到定义好的环境变量了，也可以使用process.env.xxx这种方式进行访问
//   const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

//   return {
//     plugins: [vue()],
//     base: VITE_PUBLIC_PATH || '/',
//   }
// })

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  // 获取定义的环境变量，也可以使用process.env.xxx 这种方式进行访问
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  return {
    plugins: [vue()],
    base: VITE_PUBLIC_PATH || '/',
  }
})