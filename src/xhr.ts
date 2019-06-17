// 真正去实现请求功能的部分
// 设置请求头
import { AxiosRequestConfig } from './types/index'
function xhr(config: AxiosRequestConfig): void {
  let { url, method = 'get', data = null, headers } = config
  let request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
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
}
export default xhr
