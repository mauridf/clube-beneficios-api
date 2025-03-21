const CompraRepository = require('../repositories/CompraRepository');

class CompraService {
  async create(compraData) {
    return await CompraRepository.create(compraData);
  }

  async findAll() {
    return await CompraRepository.findAll();
  }

  async findById(id) {
    return await CompraRepository.findById(id);
  }

  async update(id, compraData) {
    return await CompraRepository.update(id, compraData);
  }

  async delete(id) {
    return await CompraRepository.delete(id);
  }

  async findByClienteId(clienteId) {
    return await CompraRepository.findByClienteId(clienteId);
  }

  async addProdutosToCompra(compraId, produtos) {
    return await CompraRepository.addProdutosToCompra(compraId, produtos);
  }

  async getProdutosFromCompra(compraId) {
    return await CompraRepository.getProdutosFromCompra(compraId);
  }
}

module.exports = new CompraService();