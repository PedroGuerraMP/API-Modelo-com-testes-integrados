const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Usuario = require('./usuario-model');

const Despesa = sequelize.define('Despesa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    loginUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Usuario,
          key: 'login'
        }
    }
});

Despesa.belongsTo(Usuario, { foreignKey: 'loginUsuario'});

module.exports = Despesa;