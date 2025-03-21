const { validate } = require('class-validator');
const ClienteDTO = require('../dtos/ClienteDTO');
const ClienteService = require('../services/ClienteService');

class ClienteController {
  async create(req, res) {
    try {
      const clienteDTO = new ClienteDTO();
      Object.assign(clienteDTO, req.body); // Copia os dados do corpo da requisição para o DTO

      // Valida o DTO
      const errors = await validate(clienteDTO);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Chama o serviço passando o DTO
      const cliente = await ClienteService.create(clienteDTO);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const clientes = await ClienteService.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Validação básica do email e senha (opcional)
      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const token = await ClienteService.login(email, senha);
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClienteController();