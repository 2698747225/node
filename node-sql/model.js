const fs = require('fs');
const {sequelize} = require('./db');

const files = fs.readdirSync(__dirname + '/models');

const jsFiles = files.filter(file => {
  return file.endsWith('.js')
});

(jsFiles || []).forEach(file => {
  const name = file.substring(0, file.length - 3);
  module.exports[name] = require(__dirname + '/models/' + file);
})

module.exports.sync = () => {
  sequelize.sync();
}