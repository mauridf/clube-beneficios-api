const ClienteService = require('../services/ClienteService');

class ClienteController {
  async create(req, res) {
    try {
      const cliente = await ClienteService.create(req.body);
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
      const token = await ClienteService.login(email, senha);
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClienteController();