const router = require('./controllers/router')
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
const templating = require('./controllers/templating');
const path = require('path');
const staticFiles = require('./controllers/staticFiles')


const time_reocrd = async function (ctx, next) {
  var start = +new Date(), time;
  await next();
  time = +new Date() - start
  // 记录时间
  ctx.response.set('X-Response-Time', `${time}ms`)
};

app.use(bodyParser());
app.use(router.routes());
app.use(time_reocrd);
// 可以做环境判断
app.use(templating(path.resolve(__dirname, 'views')))

app.use(staticFiles())

app.listen(3000);