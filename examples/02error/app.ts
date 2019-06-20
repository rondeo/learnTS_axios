// 向外导出的 AxiosError 接口
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/02error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  // 可以获知接口形状了
  console.error(e.message)
  console.error(e.code)
})
