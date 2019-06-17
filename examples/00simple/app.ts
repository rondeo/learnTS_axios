import axios from '../../src/index'

axios({
  method: 'get',
  url: '/00simple/get',
  params: {
    a: 1,
    b: 2
  }
})
