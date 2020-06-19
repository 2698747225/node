const nunjucks = require('nunjucks');

function createEnv (path, opts) {
  var env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path || 'views', {
      noCache: false,
      watch: false,
      ...opts
    })
  );

  if (opts &&opts.filters) {
    for (var i in opts.filters) {
      env.addFilter(f, opts.filters(i));
    }
  }
  return env;
}

function templating (path, opts) {
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    ctx.render = function (view, model) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
    };
    await next();
  };
};

module.exports = templating;