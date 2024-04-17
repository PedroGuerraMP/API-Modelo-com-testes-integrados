const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Usuario = sequelize.define('Usuario', {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;