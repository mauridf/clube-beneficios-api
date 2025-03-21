const request = require('supertest');
const app = require('../../src/app');
const { Compra, Pagamento } = require('../../src/models');

describe('Relatório de Vendas', () => {
  beforeAll(async () => {
    await Compra.sync({ force: true });
    await Pagamento.sync({ force: true });
  });

  it('deve gerar um relatório de vendas agregadas', async () => {
    // Cria algumas compras e pagamentos para teste
    await Compra.bulkCreate([
      { status: 'pendente' },
      { status: 'pago' },
      { status: 'pago' },
    ]);

    await Pagamento.bulkCreate([
      { valor: 4500.00, status: 'pendente', compraId: 1 },
      { valor: 3000.00, status: 'pago', compraId: 2 },
      { valor: 1500.00, status: 'pago', compraId: 3 },
    ]);

    const res = await request(app)
      .get('/api/relatorios/vendas')
      .set('Authorization', 'Bearer <TOKEN_JWT>');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalVendas');
    expect(res.body).toHaveProperty('valorTotalVendas');
    expect(res.body).toHaveProperty('vendasPendentes');
    expect(res.body).toHaveProperty('vendasPagas');
    expect(res.body.detalhes).toBeInstanceOf(Array);
  });
});