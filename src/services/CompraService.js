const CompraRepository = require('../repositories/CompraRepository');
const validator = require('validator');

class CompraService {
  async create(compraDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const compraData = {
      clienteId: compraDTO.clienteId,
      produtos: compraDTO.produtos,
      status: validator.escape(compraDTO.status),
    };

    // Salva no banco de dados
    return await CompraRepository.create(compraData);
  }

  async findAll() {
    return await CompraRepository.findAll();
  }

  async findById(id) {
    return await CompraRepository.findById(id);
  }

  async update(id, compraDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const compraData = {
      clienteId: compraDTO.clienteId,
      produtos: compraDTO.produtos,
      status: validator.escape(compraDTO.status),
    };

    // Atualiza no banco de dados
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

  async gerarRelatorioVendas() {
    const relatorio = await CompraRepository.gerarRelatorioVendas();

    // Formata o relatório para uma estrutura mais amigável
    const resultado = {
      totalVendas: relatorio.reduce((acc, item) => acc + item.totalVendas, 0),
      valorTotalVendas: relatorio.reduce((acc, item) => acc + item.valorTotalVendas, 0),
      vendasPendentes: relatorio.find((item) => item.status === 'pendente')?.totalVendas || 0,
      vendasPagas: relatorio.find((item) => item.status === 'pago')?.totalVendas || 0,
      detalhes: relatorio,
    };

    return resultado;
  }
}

module.exports = new CompraService();