import { isPlainObject } from './utilities'

export function transfromRequest(data: any): any {
  if (isPlainObject(data)) {
    // 只有普通对象需要去转变成字符串，这个需要去查找 send 的mdn 文档
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
    data = JSON.stringify(data)
  }
  return data
}

export function transfromResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      // do nothing
    }
  }
  return data
}
