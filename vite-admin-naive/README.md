# Vue 3 + Vite

在vite项目中，以`VITE_` 为前缀的环境变量可以通过 `import.meta.env.xxx`的方式访问，.env文件的环境变量会在所有环境中加载，但是优先级更低，会被当前模式下的同名变量覆盖。

但是，在node环境中（如`vite.config.js`文件），并不能通过import.meta.env.xxx这种方式使用环境变量

vite-plugin-vue-setup-extend：扩展setup插件，支持在script标签中使用name属性
vite-plugin-html：一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件，主要是为了对 index.html 进行压缩和注入动态数据，例如替换网站标题和cdn
unocss： 出自antfu的原子化css