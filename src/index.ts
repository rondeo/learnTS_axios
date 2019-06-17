// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { buildURL } from './helpers/url'
import { transfromRequest, transfromResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from './types/index'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

// 配制处理有很多步骤，url 只是其中之一
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}
// data 转为 json 字符串传递
function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  if (data) {
    return transfromRequest(data)
  }
  return data
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transfromResponseData(res: AxiosReponse): AxiosReponse {
  res.data = transfromResponse(res.data)
  return res
}
export default axios
