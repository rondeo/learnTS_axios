import axios from '../../src/index'
// post 测试
/* 
  添加了 request body 的处理 √
  添加 request header 的处理
*/
// 发现普通对象类型的数据没有显示出来，
// 因为没有设置 header 
axios({
  method: 'post',
  url: '/01base/post',
  data: {
    a: 1,
    b: 2
  }
})

// buffer 数据
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/01base/buffer',
  data: arr
})
