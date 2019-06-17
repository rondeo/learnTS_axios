// 真正去实现请求功能的部分
import { AxiosRequestConfig } from './types/index'
function xhr(config: AxiosRequestConfig): void {
  let { url, method = 'get', params, data = null } = config
  let request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
export default xhr
