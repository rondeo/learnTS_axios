import axios from '../../src/index'
// 处理响应数据，使得可以在代码中获得到
/* 
  promisify axios 的返回值 √
  对象化 响应头 
  默认将返回数据处理成 json 
*/
axios({
  method: 'post',
  url: '/01base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios({
  method: 'post',
  url: '/01base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})
