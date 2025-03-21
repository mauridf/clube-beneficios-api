const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago'),
    defaultValue: 'pendente',
  },
});

// Hook após atualizar um pagamento
Pagamento.afterUpdate(async (pagamento, options) => {
  // Verifica se o status foi alterado para "pago"
  if (pagamento.status === 'pago' && pagamento.previous('status') === 'pendente') {
    // Atualiza o status da compra associada para "pago"
    await Compra.update(
      { status: 'pago' },
      { where: { id: pagamento.compraId } }
    );
  }
});

module.exports = Pagamento;