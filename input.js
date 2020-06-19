'use strict';

var fs = require('fs')

// 打开流
var rs = fs.createReadStream('output.txt', 'utf-8');

rs.on('data', function (chunk) {
  console.log(chunk)
})

rs.on('end', function () {
  console.log('end')
})

rs.on('error', function (err) {
  console.log(err)
})