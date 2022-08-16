import axios from "axios";
import { Toast } from "vant";
import { getToken, removeToken } from "@/utils/auth";

const baseURL = import.meta.env.VITE_BASE_SYSTEM_TARGET; // 通用环境
const promotionURL = import.meta.env.VITE_BASE_PROMOTION_TARGET; // 分润环境

const service = axios.create({
  validateStatus: () => true,
  timeout: 500000
})

let loadingInstance = null;
const ERROR_MESSAGE = "网络错误，请稍后再试";

// request拦截器
service.interceptors.request.use(
  config => {
    switch (config.urlType) {
      case "promotion":
        config.url = `${promotionURL}${config.url}`;
        break;
      default:
        config.url = `${baseURL}${config.url}`;
        break;
    }
    config.headers["X-Access-Token"] = getToken();

    loadingInstance = Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    loadingInstance.clear();
    const res = response.data;
    if (res.code !== 0) {
      Toast.fail({
        message: res.message || ERROR_MESSAGE,
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return Promise.resolve(res.result);
    }
  },
  error => {
    Toast.fail({
      message: error.message || ERROR_MESSAGE,
      duration: 3 * 1000
    })
    return Promise.reject(error);
  }
)

export default service;