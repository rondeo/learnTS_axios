// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
import Axios from './core/Axios'
import { extend } from './helpers/utilities'
import { AxiosInstance } from './types/index'
function createInstance(): AxiosInstance {
  let context = new Axios()
  let instance = Axios.prototype.request.bind(context)
  // 将原型上的其他方法添加到实例上，实例本人是个可调用函数
  extend(instance, context)
  return instance as AxiosInstance
}

let axios = createInstance()

export default axios
