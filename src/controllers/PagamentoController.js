const { validate } = require('class-validator');
const PagamentoDTO = require('../dtos/PagamentoDTO');
const PagamentoService = require('../services/PagamentoService');

class PagamentoController {
  async create(req, res) {
    try {
      const pagamentoDTO = new PagamentoDTO();
      Object.assign(pagamentoDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(pagamentoDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Chama o serviço passando o DTO
      const pagamento = await PagamentoService.create(pagamentoDTO);
      logger.info('Pagamento efetuado com sucesso');
      res.status(201).json(pagamento);
    } catch (error) {
      logger.error(`Erro ao efetuar o pagamento: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const pagamentos = await PagamentoService.findAll();
      logger.info('Listagem dos pagamentos efetuados com sucesso');
      res.status(200).json(pagamentos);
    } catch (error) {
      logger.error(`Erro ao listar os pagamentos efetuados: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const pagamento = await PagamentoService.findById(req.params.id);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      logger.info('Pagamento foi localizado');
      res.status(200).json(pagamento);
    } catch (error) {
      logger.error(`Erro ao localizar Pagamento: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const pagamentoDTO = new PagamentoDTO();
      Object.assign(pagamentoDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(pagamentoDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const pagamento = await PagamentoService.update(req.params.id, pagamentoDTO);
      logger.info('Pagamento atualizado com sucesso');
      res.status(200).json(pagamento);
    } catch (error) {
      logger.error(`Erro ao atualizar o pagmento: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await PagamentoService.delete(req.params.id);
      logger.info('Pagamento deletado com sucesso');
      res.status(204).send();
    } catch (error) {
      logger.error(`Erro ao deletar o pagamento: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }

  async findByCompraId(req, res) {
    try {
      const pagamento = await PagamentoService.findByCompraId(req.params.compraId);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }
      logger.info('Pagamento da Compra localizado');
      res.status(200).json(pagamento);
    } catch (error) {
      logger.error(`Erro ao localizar o pagamento da compra: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PagamentoController();