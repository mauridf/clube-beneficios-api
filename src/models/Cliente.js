const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(100), // Aumento do tamanho para armazenar o hash
    allowNull: false,
  },
  tipoUsuario: {
    type: DataTypes.ENUM('admin', 'cliente'),
    allowNull: false,
  },
});

module.exports = Cliente;