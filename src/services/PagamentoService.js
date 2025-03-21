const PagamentoRepository = require('../repositories/PagamentoRepository');

class PagamentoService {
  async create(pagamentoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const pagamentoData = {
      valor: pagamentoDTO.valor,
      status: pagamentoDTO.status,
      compraId: pagamentoDTO.compraId,
    };

    // Salva no banco de dados
    return await PagamentoRepository.create(pagamentoData);
  }

  async findAll() {
    return await PagamentoRepository.findAll();
  }

  async findById(id) {
    return await PagamentoRepository.findById(id);
  }

  async update(id, pagamentoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const pagamentoData = {
      valor: pagamentoDTO.valor,
      status: pagamentoDTO.status,
      compraId: pagamentoDTO.compraId,
    };

    // Atualiza no banco de dados
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