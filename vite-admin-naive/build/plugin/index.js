import vue from '@vitejs/plugin-vue';

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */

import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
  ]

  return plugins;
}