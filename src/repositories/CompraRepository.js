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
}

module.exports = new CompraRepository();