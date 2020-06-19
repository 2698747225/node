const Koa = require('koa')

// koa 路由管理
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

router.post('/action', async (ctx, next) => {
  console.log(ctx.request.body)
  console.log(ctx)
  
})

router.get('/', async (ctx, next) => {
  console.log(ctx)
  next()
})

app.use(bodyParser());
app.use(router.routes());
app.listen(3000)
console.log('connect', '=============>>>>>>>>>>>>>')