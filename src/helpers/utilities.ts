// 更通用的工具函数
const toString = Object.prototype.toString
/* export function isObject(obj: any): obj is Object {
  return obj !== null && typeof obj === 'object'
} */
// 这种方式可以直接判断出普通函数，上面那种方法，即使是 Date , 等任意 new 出来的类型都可以
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
export function isDate(date: any): date is Date {
  return toString.call(date) === '[object Date]'
}
