const { validate } = require('class-validator');
const CompraDTO = require('../dtos/CompraDTO');
const CompraService = require('../services/CompraService');

class CompraController {
  async create(req, res) {
    try {
      const compraDTO = new CompraDTO();
      Object.assign(compraDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(compraDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Chama o serviço passando o DTO
      const compra = await CompraService.create(compraDTO);
      res.status(201).json(compra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const compras = await CompraService.findAll();
      res.status(200).json(compras);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const compra = await CompraService.findById(req.params.id);
      if (!compra) {
        return res.status(404).json({ error: 'Compra não encontrada' });
      }
      res.status(200).json(compra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const compraDTO = new CompraDTO();
      Object.assign(compraDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(compraDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const compra = await CompraService.update(req.params.id, compraDTO);
      res.status(200).json(compra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CompraService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findByClienteId(req, res) {
    try {
      const compras = await CompraService.findByClienteId(req.params.clienteId);
      res.status(200).json(compras);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addProdutos(req, res) {
    try {
      const { compraId } = req.params;
      const { produtos } = req.body;

      // Validação básica dos produtos (opcional)
      if (!produtos || !Array.isArray(produtos)) {
        return res.status(400).json({ error: 'Produtos devem ser um array' });
      }

      await CompraService.addProdutosToCompra(compraId, produtos);
      res.status(200).json({ message: 'Produtos adicionados à compra com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProdutos(req, res) {
    try {
      const { compraId } = req.params;
      const produtos = await CompraService.getProdutosFromCompra(compraId);
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async gerarRelatorioVendas(req, res) {
    try {
      const relatorio = await CompraService.gerarRelatorioVendas();
      res.status(200).json(relatorio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CompraController();