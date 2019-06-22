import { AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'
// 要使用定义的接口实现的类
export default class Axios {
  request(config: AxiosRequestConfig) {
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig) {
    return this.requestWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig) {
    return this.requestWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig) {
    return this.requestWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig) {
    return this.requestWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.requestWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.requestWithData('patch', url, data, config)
  }

  private requestWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private requestWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
