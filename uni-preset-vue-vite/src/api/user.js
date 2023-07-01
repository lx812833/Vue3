import request from "@/utils/request";

/**
 * @description 授权登录
 * @param {*} data 
 */
export function wxLogin(data) {
  return request({
    url: "/wx/code2Session",
    method: "post",
    params: {},
    data
  })
}

/**
 * @description 获取手机号
 * @param {*} data 
 */
export function getPhoneNumber(data) {
  return request({
    url: "/wx/getPhoneNumber",
    method: "post",
    params: {},
    data
  })
}

