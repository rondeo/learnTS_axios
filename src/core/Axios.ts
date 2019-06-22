import {
  AxiosRequestConfig,
  Method,
  AxiosResponse,
  AxiosPromise,
  ResolveFn,
  RejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
// 定义 Axios 中的 interceptor 属性接口
interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain {
  resolved: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectFn
}
// 要使用定义的接口实现的类
export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

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

    // 调用拦截器
    let chain: PromiseChain[] = [
      // 先添加的最后执行
      { resolved: dispatchRequest, rejected: undefined }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    // return dispatchRequest(config)
    return promise
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
