const {config: baseConfig} = require('./config-default');
const {config: testConfig} = require('./config-test');
const {config: overConfig} = require('./config-override');

let config = null;
console.log(baseConfig)
// 可在webpack中，或者入口文件区分环境，修改NODE_ENV
if (process.env.NODE_ENV === 'test') {
  config = Object.assign(baseConfig, testConfig);
} else {
  config = Object.assign(baseConfig, overConfig);
}

module.exports.config = config;