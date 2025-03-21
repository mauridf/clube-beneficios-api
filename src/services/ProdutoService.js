const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {
  async create(produtoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const produtoData = {
      nome: produtoDTO.nome,
      descricao: produtoDTO.descricao,
      preco: produtoDTO.preco,
      categoria: produtoDTO.categoria,
    };

    // Salva no banco de dados
    return await ProdutoRepository.create(produtoData);
  }

  async findAll() {
    return await ProdutoRepository.findAll();
  }

  async findById(id) {
    return await ProdutoRepository.findById(id);
  }

  async update(id, produtoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const produtoData = {
      nome: produtoDTO.nome,
      descricao: produtoDTO.descricao,
      preco: produtoDTO.preco,
      categoria: produtoDTO.categoria,
    };

    // Atualiza no banco de dados
    return await ProdutoRepository.update(id, produtoData);
  }

  async delete(id) {
    return await ProdutoRepository.delete(id);
  }
}

module.exports = new ProdutoService();