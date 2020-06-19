const Koa = require('koa')

// koa 路由管理
const router = require('koa-router')();
const app = new Koa();

// 相当于一个全请求过滤，所有请求都会进这个方法
app.use(async (ctx, next) => {
  console.log(1)
  await next();
  console.log(2)
})

router.get('/hello/:name', async (ctx, next) => {
  await next()
  const name = ctx.params.name;
  ctx.response.body = `<h1>hello,${name}</h1>`
})

router.get('/', async (ctx, next) => {
  
})
app.use(router.routes());
app.listen(3000);