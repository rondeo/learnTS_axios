# learnTS_axios

基于 typeacript 重构 axios , 用来学习 typescript 的使用

## 遇到的问题

1. 手动设置 `content-type` 不生效
   原因：服务端的 bodyparser.json 中的 type 没有正确设置
   解决：

```js
app.use(bodyParser.json({ type: 'application/json' }))
```
