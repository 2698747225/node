'use strict';

var fs = require('fs'),
  http = require('http'),
  url = require('url'),
  path = require('path');

var folderList = ['index.html', 'default.html']

// 获取项目根目录
var root = process.argv[2] || '.';
var server = http.createServer((request, response) => {
  // 获取请求路径
  var pathname = url.parse(request.url).pathname;
  // 根据请求路径查找根目录相对路径
  var filepath = path.join(root, pathname);
  fs.stat(filepath, (err, stats) => {
    if (!stats) {
      return
    }
    if (!pathname || pathname === '/') {
      response.writeHead(404);
      response.end('404 not found');
    } else if (!stats.isFile()) {
      folderList.forEach(file => {
        const secondPath = path.join(filepath, file)
        fs.stat(secondPath, (serr, data) => {
          if (serr || !data.isFile()) {
            return false
          } else {
            response.writeHead(200);
            fs.createReadStream(secondPath).pipe(response);
            return true
          }
        })
      })
    } else {
      response.writeHead(200);
      fs.createReadStream(filepath).join(response);
    }
    // if (err || !stats.isFile()) {
    //   response.writeHead(404);
    //   response.end('404 not found');
    // } else {
    //   response.writeHead(200);
    //   // 读取文档流拼接
    //   fs.createReadStream(filepath).pipe(response);
    // }
  })
})


server.listen(8000);