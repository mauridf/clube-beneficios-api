const request = require('supertest');
const app = require('../../src/app');
const { Compra, Cliente, Produto } = require('../../src/models');

describe('Compra API', () => {
  beforeAll(async () => {
    await Compra.sync({ force: true });
    await Cliente.sync({ force: true });
    await Produto.sync({ force: true });
  });

  it('deve criar uma nova compra', async () => {
    const res = await request(app)
      .post('/api/compras')
      .send({
        clienteId: 1,
        produtos: [1, 2, 3],
        status: 'pendente',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todas as compras', async () => {
    const res = await request(app).get('/api/compras');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});