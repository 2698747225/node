const router = require('koa-router')();
const path = require('path');


router.get('/base', async (ctx, next) => {
  await next();
  ctx.render(path.resolve(__dirname, '../views/base.html'), { text: 'hahaha' })
});

router.get('/login', async (ctx, next) => {
  await next();
  ctx.render(path.resolve(__dirname, '../views/index.html'), { msg: '登录成功' })
})

module.exports = router;