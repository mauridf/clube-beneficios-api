const PagamentoRepository = require('../repositories/PagamentoRepository');

class PagamentoService {
  async create(pagamentoData) {
    return await PagamentoRepository.create(pagamentoData);
  }

  async findAll() {
    return await PagamentoRepository.findAll();
  }

  async findById(id) {
    return await PagamentoRepository.findById(id);
  }

  async update(id, pagamentoData) {
    return await PagamentoRepository.update(id, pagamentoData);
  }

  async delete(id) {
    return await PagamentoRepository.delete(id);
  }

  async findByCompraId(compraId) {
    return await PagamentoRepository.findByCompraId(compraId);
  }
}

module.exports = new PagamentoService();