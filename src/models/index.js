const Cliente = require('./Cliente');
const Produto = require('./Produto');
const Compra = require('./Compra');
const Pagamento = require('./Pagamento');

Cliente.hasMany(Compra);
Compra.belongsTo(Cliente);

Compra.belongsToMany(Produto, { through: 'CompraProduto' });
Produto.belongsToMany(Compra, { through: 'CompraProduto' });

Compra.hasOne(Pagamento);
Pagamento.belongsTo(Compra);

module.exports = {
  Cliente,
  Produto,
  Compra,
  Pagamento,
};