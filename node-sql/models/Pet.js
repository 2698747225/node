const { defineModel } = require('../db');
const Sequelize = require('sequelize');

const pet = defineModel('pet', {
  name: Sequelize.STRING(50),
  birth: Sequelize.STRING(50)
});

module.exports.Pet = pet;
