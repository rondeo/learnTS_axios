import { AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'
// 要使用定义的接口实现的类
export default class Axios {
  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      // 就是 config 对象，接口定义好了就这两种情况
      config = url
    }
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
