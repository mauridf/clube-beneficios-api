const ClienteRepository = require('../repositories/ClienteRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class ClienteService {
  async create(clienteData) {
    clienteData.senha = bcrypt.hashSync(clienteData.senha, 10);
    return await ClienteRepository.create(clienteData);
  }

  async findAll() {
    return await ClienteRepository.findAll();
  }

  async findById(id) {
    return await ClienteRepository.findById(id);
  }

  async findByEmail(email) {
    return await ClienteRepository.findByEmail(email);
  }

  async login(email, senha) {
    const cliente = await this.findByEmail(email);
    if (!cliente || !bcrypt.compareSync(senha, cliente.senha)) {
      throw new Error('Credenciais inválidas');
    }
    const token = jwt.sign({ id: cliente.id }, 'secret', { expiresIn: '1h' });
    return { token };
  }
}

module.exports = new ClienteService();