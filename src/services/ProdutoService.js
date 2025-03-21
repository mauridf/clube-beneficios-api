const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {
  async create(produtoData) {
    return await ProdutoRepository.create(produtoData);
  }

  async findAll() {
    return await ProdutoRepository.findAll();
  }

  async findById(id) {
    return await ProdutoRepository.findById(id);
  }

  async update(id, produtoData) {
    return await ProdutoRepository.update(id, produtoData);
  }

  async delete(id) {
    return await ProdutoRepository.delete(id);
  }
}

module.exports = new ProdutoService();