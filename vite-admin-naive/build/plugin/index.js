import vue from '@vitejs/plugin-vue';

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import { unocss } from './unocss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    unocss(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ]

  return plugins;
}