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
  url: string
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
