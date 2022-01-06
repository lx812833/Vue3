const registerRouter = require("./backend/router");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    // before 和 after 配置用于在 webpack-dev-server 定义额外的中间件
    // 可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。
    before(app) {
      registerRouter(app)
    }
  }
}