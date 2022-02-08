import { createStore, createLogger } from "vuex";
import { state } from "./state";
import { mutations } from "./mutations";
import * as getters from "./getters";
import * as actions from "./actions";

const debug = process.env.NODE_ENV !== "production";

/**
 * plugins：Vuex 自带一个日志插件用于一般的调试，生成状态快照，对比出改变前后不同的值
 * logger 插件会生成状态快照，所以仅在开发环境使用
 */

export default createStore({
  state,
  getters,
  mutations,
  actions,
  strict: debug, // 开发环境下开启严格模式
  plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex状态修改
})
