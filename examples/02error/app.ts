import axios from '../../src/index'

// 404
axios({
  method: 'get',
  url: '/0202error/get1'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

// 可能是各种错误
axios({
  method: 'get',
  url: '/02error/get'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

// 模拟网络问题，配合开发者工具中的 offline
setTimeout(() => {
  axios({
    method: 'get',
    url: '/02error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

// 模拟超时错误
axios({
  method: 'get',
  url: '/02error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})
