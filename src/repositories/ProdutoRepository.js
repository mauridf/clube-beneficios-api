const { Produto } = require('../models');

class ProdutoRepository {
  async create(produtoData) {
    return await Produto.create(produtoData);
  }

  async findAll() {
    return await Produto.findAll();
  }

  async findById(id) {
    return await Produto.findByPk(id);
  }

  async update(id, produtoData) {
    const produto = await this.findById(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return await produto.update(produtoData);
  }

  async delete(id) {
    const produto = await this.findById(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return await produto.destroy();
  }
}

module.exports = new ProdutoRepository();