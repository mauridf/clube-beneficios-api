const { Compra } = require('../models');

class CompraRepository {
  async create(compraData) {
    return await Compra.create(compraData);
  }

  async findAll() {
    return await Compra.findAll();
  }

  async findById(id) {
    return await Compra.findByPk(id);
  }

  async update(id, compraData) {
    const compra = await this.findById(id);
    if (!compra) {
      throw new Error('Compra não encontrada');
    }
    return await compra.update(compraData);
  }

  async delete(id) {
    const compra = await this.findById(id);
    if (!compra) {
      throw new Error('Compra não encontrada');
    }
    return await compra.destroy();
  }

  async findByClienteId(clienteId) {
    return await Compra.findAll({ where: { clienteId } });
  }

  async addProdutosToCompra(compraId, produtos) {
    const compra = await Compra.findByPk(compraId);
    if (!compra) {
      throw new Error('Compra não encontrada');
    }
    await compra.addProdutos(produtos);
  }

  async getProdutosFromCompra(compraId) {
    const compra = await Compra.findByPk(compraId, {
      include: [{ model: Produto, through: { attributes: [] } }],
    });
    if (!compra) {
      throw new Error('Compra não encontrada');
    }
    return compra.Produtos;
  }

  async gerarRelatorioVendas() {
    const relatorio = await Compra.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalVendas'],
        [sequelize.fn('SUM', sequelize.col('valor')), 'valorTotalVendas'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN status = "pendente" THEN 1 END')), 'vendasPendentes'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN status = "pago" THEN 1 END')), 'vendasPagas'],
      ],
      include: [
        {
          model: Pagamento,
          attributes: [], // Não retorna detalhes dos pagamentos
        },
      ],
      group: ['status'], // Agrupa por status
      raw: true, // Retorna dados brutos (sem instâncias do Sequelize)
    });

    return relatorio;
  }
}

module.exports = new CompraRepository();