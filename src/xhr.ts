// 真正去实现请求功能的部分
// 设置请求头
import { parseHeaders } from './helpers/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosReponse } from './types/index'
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let { url, method = 'get', data = null, headers, responseType, timeout } = config
    let request = new XMLHttpRequest()

    // 如果响应类型存在，需要添加到 request 对象中
    if (responseType) {
      request.responseType = responseType
    }
    // 如果配置了 timeout 就添加到 request 对象上
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)
    // 设置监听器
    request.onreadystatechange = function handler() {
      // 0-4 ,4 接收到响应状态
      if (request.readyState !== 4) return
      // 处理状态码错误1: 当网络错误或者超时错误时，request.status === 0, 交给外边两个事件监听处理了
      if (request.status === 0) return

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
      handleResponse(response)
    }
    // 处理状态码错误2
    function handleResponse(response: AxiosReponse): void {
      if (response.status >= 200 && (response.status < 300 || response.status === 304)) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
    // 捕获网络错误
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
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
