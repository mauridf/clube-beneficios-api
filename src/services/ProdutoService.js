const ProdutoRepository = require('../repositories/ProdutoRepository');
const redis = require('../config/redis');
const validator = require('validator');

class ProdutoService {
  async create(produtoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const produtoData = {
      nome: validator.escape(produtoDTO.nome), // Remove caracteres perigosos
      descricao: validator.escape(produtoDTO.descricao),
      preco: parseFloat(produtoDTO.preco), // Converte para número
      categoria: validator.escape(produtoDTO.categoria),
    };

    // Salva no banco de dados
    return await ProdutoRepository.create(produtoData);
  }

  async findAll() {
    return await ProdutoRepository.findAll();
  }

  async findAll() {
    const cacheKey = 'produtos:all'; // Chave do cache
    const cachedProdutos = await redis.get(cacheKey);

    if (cachedProdutos) {
      // Retorna os dados do cache
      return JSON.parse(cachedProdutos);
    }

    // Busca os dados no banco de dados
    const produtos = await ProdutoRepository.findAll();

    // Armazena os dados no cache por 1 hora (3600 segundos)
    await redis.set(cacheKey, JSON.stringify(produtos), 'EX', 3600);

    return produtos;
  }

  async update(id, produtoDTO) {
    // Mapeia o DTO para o modelo do banco de dados
    const produtoData = {
      nome: validator.escape(produtoDTO.nome), // Remove caracteres perigosos
      descricao: validator.escape(produtoDTO.descricao),
      preco: parseFloat(produtoDTO.preco), // Converte para número
      categoria: validator.escape(produtoDTO.categoria),
    };

    // Atualiza no banco de dados
    return await ProdutoRepository.update(id, produtoData);
  }

  async delete(id) {
    return await ProdutoRepository.delete(id);
  }
}

module.exports = new ProdutoService();