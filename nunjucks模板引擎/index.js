/** 
 * nunjucks更时候针对node的模板引擎，前端拥有框架类似vue、ang、react，拥有更优秀的模板引擎渲染模板
*/
const nunjucks = require('nunjucks')
const path = require('path')
/** 
 * FileSystemLoader创建文件系统加速器,从views目录下读取模板
*/
function createEnv (path, opts) {
  var
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path, {
        noCache: noCache,
        watch: watch,
      }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    });
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

// env作为模板引擎对象，读取相对路径下的模板
var env = createEnv(path.resolve(__dirname, 'views'), {
  watch: true,
  filters: {
    hex: function (n) {
      return '0x' + n.toString(16);
    }
  }
});

// env.render(path.resolve(__dirname, 'views/base.html'), { name: 'lly' })
console.log(env.render(path.resolve(__dirname, 'views/base.html'), { name: 'lly' }))