// 真正去实现请求功能的部分
// 设置请求头
import { parseHeaders } from './helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from './types/index'
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    let { url, method = 'get', data = null, headers, responseType } = config
    let request = new XMLHttpRequest()

    // 如果响应类型存在，需要添加到 request 对象中
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)
    // 设置监听器
    request.onreadystatechange = function handler() {
      // 0-4 ,4 接收到响应状态
      if (request.readyState !== 4) return
      let responseHeaders = parseHeaders(request.getAllResponseHeaders())
      let responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      let response: AxiosReponse
      response = {
        status: request.status,
        statusText: request.statusText,
        // 返回的是字符串类型
        headers: responseHeaders,
        request,
        config,
        data: responseData
      }
      // 通过 resolve 返回出去
      resolve(response)
    }
    // 遍历 headers 对象，设置请求头
    Object.keys(headers).forEach(headerName => {
      if (data === null && headerName.toLowerCase() === 'content-type') {
        // 既然没有数据的话，就没必要设置 content-type 的请求头了
        delete headers[headerName]
      } else {
        request.setRequestHeader(headerName, headers[headerName])
      }
    })
    // 请求头设置一定要在 send 之前
    request.send(data)
  })
}
export default xhr
