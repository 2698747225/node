/**
 * 合理的koa工程，路由管理结构
 */

const fs = require('fs');
const Koa = require('koa')
// koa 路由管理
const router = require('koa-router')();
const app = new Koa();
// 通过fs 模块读取文件列表
const files = fs.readdirSync(__dirname + '/controllers');
// 过滤读取的文件只取JS文件
const js_files = files.filter(file => file.endsWith('.js'));

// 遍历全部JS文件，对JS文件中每个请求做分别处理
js_files.forEach(file => {
  const mapping = require(__dirname + '/controllers/' + file);
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      const path = url.substring(4);
      // 路由监听
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST')) {
      const path = url.substring(5);
      // 路由监听
      router.post(path, mapping[url]);
    }
  }
})

app.use(router.routes());
app.listen(3000)