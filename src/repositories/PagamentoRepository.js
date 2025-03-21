const { Pagamento } = require('../models');

class PagamentoRepository {
  async create(pagamentoData) {
    return await Pagamento.create(pagamentoData);
  }

  async findAll() {
    return await Pagamento.findAll();
  }

  async findById(id) {
    return await Pagamento.findByPk(id);
  }

  async update(id, pagamentoData) {
    const pagamento = await this.findById(id);
    if (!pagamento) {
      throw new Error('Pagamento não encontrado');
    }
    return await pagamento.update(pagamentoData);
  }

  async delete(id) {
    const pagamento = await this.findById(id);
    if (!pagamento) {
      throw new Error('Pagamento não encontrado');
    }
    return await pagamento.destroy();
  }

  async findByCompraId(compraId) {
    return await Pagamento.findOne({ where: { compraId } });
  }
}

module.exports = new PagamentoRepository();