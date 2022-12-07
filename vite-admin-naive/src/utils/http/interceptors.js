import { isNullOrUndef } from '@/utils/is';
import { toLogin } from '@/utils/auth';
import { isWithoutToken } from './helpers';

export function reqResolve(config) {
  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() };
  }

  // 处理不需要token的请求
  if (isWithoutToken(config)) {
    return config;
  }

  const token = getToken();
  if (!token) {
    /**
     * * 未登录或者token过期的情况下
     * * 跳转登录页重新登录，携带当前路由及参数，登录成功会回到原来的页面
     */
    toLogin();
    return Promise.reject({ code: '-1', message: '未登录' });
  }
  return config;
}

export function reqReject(error) {
  return Promise.reject(error);
}

export function resResolve(response) {
  return response?.data;
}

export function resReject(error) {
  let { code, message } = error.response?.data || {};
  if (isNullOrUndef(code)) {
    // 未知错误
    code = -1;
    message = '接口异常！';
  } else {
    switch (code) {
      case 401:
        message = message || '登录已过期';
        break;
      case 403:
        message = message || '没有权限';
        break;
      case 404:
        message = message || '资源或接口不存在';
        break;
      default:
        message = message || '未知异常';
        break;
    }
  }
  console.error(`【${code}】 ${error}`);
  return Promise.resolve({ code, message, error });
}