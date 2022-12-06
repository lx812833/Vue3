# Vue 3 + Vite

在vite项目中，以`VITE_` 为前缀的环境变量可以通过 `import.meta.env.xxx`的方式访问，.env文件的环境变量会在所有环境中加载，但是优先级更低，会被当前模式下的同名变量覆盖。

但是，在node环境中（如`vite.config.js`文件），并不能通过import.meta.env.xxx这种方式使用环境变量