const request = require('supertest');
const app = require('../../src/app');
const { Cliente } = require('../../src/models');

describe('Autenticação', () => {
  beforeAll(async () => {
    await Cliente.sync({ force: true });
  });

  it('deve retornar um token JWT ao fazer login', async () => {
    await request(app)
      .post('/api/clientes')
      .send({
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: 'senha123',
        tipoUsuario: 'cliente',
      });

    const res = await request(app)
      .post('/api/clientes/login')
      .send({
        email: 'joao@example.com',
        senha: 'senha123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('deve negar acesso a um endpoint protegido sem token', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.statusCode).toEqual(401);
  });
});