// 添加泛型支持
import axios from '../../src/index'
interface ResponseData<T = any> {
  code: number
  message: string
  result: T
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/03extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  let user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
  .catch(e => console.log(e))
