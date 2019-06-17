// 更通用的工具函数
const toString = Object.prototype.toString
export function isObject(obj: any): obj is Object {
  return obj !== null && typeof obj === 'object'
}

export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]'
}
