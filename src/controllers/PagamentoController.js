const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  async create(req, res) {
    try {
      const pagamento = await PagamentoService.create(req.body);
      res.status(201).json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const pagamentos = await PagamentoService.findAll();
      res.status(200).json(pagamentos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const pagamento = await PagamentoService.findById(req.params.id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.status(200).json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const pagamento = await PagamentoService.update(req.params.id, req.body);
      res.status(200).json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await PagamentoService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findByCompraId(req, res) {
    try {
      const pagamento = await PagamentoService.findByCompraId(req.params.compraId);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      res.status(200).json(pagamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PagamentoController();