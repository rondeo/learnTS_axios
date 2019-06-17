import { isPlainObject, isDate } from './utilities'
// 处理 url 的工具函数
export function buildURL(url: string, params?: any): string {
  // TODO
  // 如果 params 不存在，直接返回
  if (!params) return url
  /* 
    params 存在的情况
    普通值
    值为数组
    值为对象
    值是特殊字符
    是 Date 对象
    空值
  */
  //  因为值可能存在数组类型，所以为了统一处理格式，这里全都统一成数组
  let values: string[] = []
  let val: any
  let parts: string[] = []
  Object.keys(params).forEach(key => {
    val = params[key]
    // 空值直接忽略
    if (val === null || typeof val === 'undefined') return
    if (Array.isArray(val)) {
      values = val
      // 数组的拼接方式和其他有点不同
      // ?foo[]=1&foo[]=2
      key += '[]'
    } else {
      values = [val]
    }
    // 处理 [val]
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  /* 
   url 情况
     已经拼接一部分 params
     存在 hash 值
  */
  //  有可能是都为空值
  if (serializedParams) {
    let hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }
    // 是有已经有一部分 params 字符串了
    url += (url.indexOf('?') !== -1 ? '&' : '?') + serializedParams
  }
  return url
}

function encode(val: string): string {
  // 替换掉特殊字符的转义
  return (
    encodeURIComponent(val)
      .replace(/%40/g, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      // 空格用 + 代替
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
  )
}
