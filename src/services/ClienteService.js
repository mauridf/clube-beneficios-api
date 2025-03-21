const ClienteRepository = require('../repositories/ClienteRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class ClienteService {
  async create(clienteData) {
    // Gera o hash da senha
    const salt = bcrypt.genSaltSync(10);
    clienteData.senha = bcrypt.hashSync(clienteData.senha, salt);
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
    // Gera o token JWT
    const token = jwt.sign({ id: cliente.id, tipoUsuario: cliente.tipoUsuario }, 'secret', { expiresIn: '1h' });
    return { token };
  }
}

module.exports = new ClienteService();