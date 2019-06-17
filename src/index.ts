// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { buildURL } from './helpers/url'
import { transfromRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
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
  // TODO
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
