import request from "@/utils/request";

// 获取token
export const getToken = () => {
  return request({
    url: "/prodMock/getTouristToken",
    method: "get",
  })
}

// 查询银行卡下拉框接口
export const bankList = () => {
  return request({
    url: "/api/withdrawal/getBankList",
    method: "get",
    urlType: "promotion",
  })
}