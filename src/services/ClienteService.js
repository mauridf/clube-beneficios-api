const ClienteRepository = require('../repositories/ClienteRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class ClienteService {
  async create(clienteDTO) {
    // Gera o hash da senha
    const salt = bcrypt.genSaltSync(10);
    clienteDTO.senha = bcrypt.hashSync(clienteDTO.senha, salt);

    // Mapeia o DTO para o modelo do banco de dados
    const clienteData = {
      nome: clienteDTO.nome,
      email: clienteDTO.email,
      senha: clienteDTO.senha,
      tipoUsuario: clienteDTO.tipoUsuario,
    };

    // Salva no banco de dados
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