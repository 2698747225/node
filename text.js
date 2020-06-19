'use strict'

var fs = require('fs')
var ws1 = fs.createWriteStream('output.txt', 'utf-8')
ws1.write('stream写入数据', 'utf-8')
ws1.end()