import { isPlainObject } from './utilities'
// 规范头属性名格式，首字母大写
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      // 判断出内容相同但是格式不同的 headers 属性名
      headers[normalizedName] = headers[name]
      // 再把之前格式不对的删除
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  // 只有普通对象 data 需要去额外保证 content-type
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chartset=utf-8'
    }
  }
  return headers
}

// 将响应头字符串，转变成对象
export function parseHeaders(headers: string): any {
  // 每行 \r\n 分割
  let parsed = Object.create(null)
  if (!headers) return parsed
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
