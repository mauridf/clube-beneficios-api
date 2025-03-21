const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compra = sequelize.define('Compra', {
  status: {
    type: DataTypes.ENUM('pendente', 'pago'),
    defaultValue: 'pendente',
  },
});

module.exports = Compra;