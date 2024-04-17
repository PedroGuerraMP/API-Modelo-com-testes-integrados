const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('onfly', 'postgres', 'yyllaM3Mih', {
  host: 'localhost',
  dialect: 'postgres', 
});

module.exports = sequelize;