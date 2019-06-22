import axios from '../../src/index'

axios({
  url: '/03extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/03extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/03extend/get')

axios.options('/03extend/options')

axios.delete('/03extend/delete')

axios.head('/03extend/head')

axios.post('/03extend/post', { msg: 'post' })

axios.put('/03extend/put', { msg: 'put' })

axios.patch('/03extend/patch', { msg: 'patch' })
