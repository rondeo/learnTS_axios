import axios from '../../src/index'

// 数组
axios({
  method: 'get',
  url: '/01base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
// 对象
axios({
  method: 'get',
  url: '/01base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
// date
axios({
  method: 'get',
  url: '/01base/get',
  params: {
    date
  }
})
// 特殊字符
axios({
  method: 'get',
  url: '/01base/get',
  params: {
    foo: '@:$, '
  }
})
// 空值
axios({
  method: 'get',
  url: '/01base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})
// hash
axios({
  method: 'get',
  url: '/01base/get#hash',
  params: {
    foo: 'bar'
  }
})
// url 已拼接
axios({
  method: 'get',
  url: '/01base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
