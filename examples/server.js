const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

// 00simple

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

// 00simple
function registerSimpleRouter() {
  router.get('/00simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

// 01base
function registerBaseRouter() {
  router.get('/01base/get', function(req, res) {
    res.json(req.query)
  })
  router.post('/01base/post', function(req, res) {
    console.log(req.body)
    res.json(req.body)
  })
  router.post('/01base/buffer', function(req, res) {
    let dataList = []
    req.on('data', chunk => {
      if (chunk) {
        dataList.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(dataList)
      res.json(buf.toJSON())
    })
  })
}

// 02error
function registerErrorRouter() {
  router.get('/02error/get', function(req, res) {
    // 可能会发送也可能不会发送
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  // 3s 后才会响应
  router.get('/02error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

// 03extend
function registerExtendRouter() {
  router.get('/03extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/03extend/options', function(req, res) {
    res.end()
  })

  router.delete('/03extend/delete', function(req, res) {
    res.end()
  })

  router.head('/03extend/head', function(req, res) {
    res.end()
  })

  router.post('/03extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/03extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/03extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/03extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
