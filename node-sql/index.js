const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,  // 连接池max连接数
    min: 9,   // 连接池min连接数
    idle: 30000   // 自动断开连接时长
  }
});

var Users = sequelize.define('users', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  name: Sequelize.STRING(50),
  birth: Sequelize.STRING(50)
}, {
  timestamps: false
})

console.log(Users.findAll())

Users.findAll().then((data) => {
  console.log(data)
})

// Users.create({
//   id: +new Date(),
//   name: 'lly',
//   birth: '1993'
// }).then(function (p) {
//   console.log(`created  ${JSON.stringify(p)}`)
// })