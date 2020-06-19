// TODO 文件内容写入
function staticFiles (url, dir) {
  return async (ctx, next) => {
    const path = ctx.request.path;
    console.log(path);
    console.log(path.substring(url.length))
  }
}

module.exports = staticFiles;