const { defineModel } = require('../db');
const Sequelize = require('sequelize');

const user = defineModel('user', {
  name: Sequelize.STRING(50),
  birth: Sequelize.STRING(50)
});

module.exports.User = user;
