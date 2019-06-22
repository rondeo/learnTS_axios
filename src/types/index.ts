// type 定义的字符串字面量类型
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  // 扩展了更多的接口后，url 可以直接传入而不是作为 config 的一部分，所以这里也变成可选
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  // 配制响应数据的类型
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  // 响应数据
  data: any
  status: number
  statusText: string
  // 响应头信息
  headers: any
  // 请求配制
  config: AxiosRequestConfig
  // 请求对象 xhr 实例
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

// 用于外部使用的 AxiosError 类型
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 扩展为混合对象
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  // get delete head options 差不多
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  // post put patch 有 data 可选参数
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  // 重载的第二种情况
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
