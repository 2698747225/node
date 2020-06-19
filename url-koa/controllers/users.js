const hello = async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `hello ${name}`
  next()
}

module.exports = {
  'GET /hello/:name': hello
}