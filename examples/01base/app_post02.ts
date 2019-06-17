import axios from '../../src/index'
// post 测试
/* 
  添加了 request body 的处理 √
  添加 request header 的处理 √
*/
axios({
  method: 'post',
  url: '/01base/post',
  data: {
    a: '自动设置头信息',
    b: 2
  }
})

// 手动设置 content-type, 大小写不敏感
axios({
  method: 'post',
  url: '/01base/post',
  headers: {
    // 'content-type': 'application/json;chartset=utf-8',
    // 设置了后端的 body-parser.json 中的 type 配制后，可以正常显示
    'content-type': 'application/json',
    // 不设置这个的话，返回结果不显示
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: '手动设置头信息',
    b: 2
  }
})

// URLSearchParams 属于可以直接发送的 BodyInit 类型，浏览器自动设置 content-type
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/01base/post',
  data: searchParams
})
