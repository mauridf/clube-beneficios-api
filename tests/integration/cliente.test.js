const request = require('supertest');
const app = require('../../src/app');
const { Cliente } = require('../../src/models');

describe('Cliente API', () => {
  beforeAll(async () => {
    await Cliente.sync({ force: true });
  });

  it('deve criar um novo cliente', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({
        nome: 'José Maria',
        email: 'josem@email.com',
        senha: 'senha123',
        tipoUsuario: 'cliente',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('não deve criar um cliente com e-mail duplicado', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({
        nome: 'José Maria',
        email: 'josem@email.com',
        senha: 'senha123',
        tipoUsuario: 'cliente',
      });
    expect(res.statusCode).toEqual(400);
  });
});