const { validate } = require('class-validator');
const ProdutoDTO = require('../dtos/ProdutoDTO');
const ProdutoService = require('../services/ProdutoService');
const logger = require('../config/logger');

class ProdutoController {
  async create(req, res) {
    try {
      const produtoDTO = new ProdutoDTO();
      Object.assign(produtoDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(produtoDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Chama o serviço passando o DTO
      const produto = await ProdutoService.create(produtoDTO);
      logger.info('Produto cadastrado com sucesso');
      res.status(201).json(produto);
    } catch (error) {
      logger.error(`Erro ao criar um produto: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const produtos = await ProdutoService.findAll();
      logger.info('Listagem de produtos realizada com sucesso');
      res.status(200).json(produtos);
    } catch (error) {
      logger.error(`Erro ao listar produtos: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const produto = await ProdutoService.findById(req.params.id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      logger.info('Busca de produto realizada com sucesso');
      res.status(200).json(produto);
    } catch (error) {
      logger.error(`Erro ao listar o produto: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const produtoDTO = new ProdutoDTO();
      Object.assign(produtoDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(produtoDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const produto = await ProdutoService.update(req.params.id, produtoDTO);
      logger.info('Produto atualizado com sucesso');
      res.status(200).json(produto);
    } catch (error) {
      logger.error(`Erro ao atualizar o produto: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ProdutoService.delete(req.params.id);
      logger.info('Produto deletado com sucesso');
      res.status(204).send();
    } catch (error) {
      logger.error(`Erro ao deletar o produto: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();