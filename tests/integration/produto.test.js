const request = require('supertest');
const app = require('../../src/app');
const { Produto } = require('../../src/models');

describe('Produto API', () => {
  beforeAll(async () => {
    await Produto.sync({ force: true });
  });

  it('deve criar um novo produto', async () => {
    const res = await request(app)
      .post('/api/produtos')
      .send({
        nome: 'Notebook',
        descricao: 'Notebook ASUS Core i5',
        preco: 4500.00,
        categoria: 'Eletrônicos',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os produtos', async () => {
    const res = await request(app).get('/api/produtos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});