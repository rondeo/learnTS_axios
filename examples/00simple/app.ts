import axios from '../../src/index'
/* 
  这一版中只实现了发送请求的功能，其他功能都没有实现
*/
axios({
  method: 'get',
  url: '/00simple/get',
  params: {
    a: 1,
    b: 2
  }
})
