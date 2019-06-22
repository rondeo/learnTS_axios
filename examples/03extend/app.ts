import axios from '../../src/index'
axios({
  url: '/03extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios('/03extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})
