const { Cliente } = require('../models');

class ClienteRepository {
  async create(clienteData) {
    return await Cliente.create(clienteData);
  }

  async findAll() {
    return await Cliente.findAll();
  }

  async findById(id) {
    return await Cliente.findByPk(id);
  }

  async findByEmail(email) {
    return await Cliente.findOne({ where: { email } });
  }
}

module.exports = new ClienteRepository();