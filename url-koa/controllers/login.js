const login = async (ctx, next) => {
  ctx.response.body = '<h1>哈哈哈哈</h1>'
  next()
}

module.exports = {
  'POST /action/haha': login
}