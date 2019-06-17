// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
