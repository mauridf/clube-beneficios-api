const { validate } = require('class-validator');
const ProdutoDTO = require('../dtos/ProdutoDTO');
const ProdutoService = require('../services/ProdutoService');

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
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const produtos = await ProdutoService.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const produto = await ProdutoService.findById(req.params.id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.status(200).json(produto);
    } catch (error) {
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
      res.status(200).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ProdutoService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();