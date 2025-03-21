const request = require('supertest');
const app = require('../../src/app');
const { Pagamento, Compra } = require('../../src/models');

describe('Pagamento API', () => {
  beforeAll(async () => {
    await Pagamento.sync({ force: true });
    await Compra.sync({ force: true });
  });

  it('deve criar um novo pagamento', async () => {
    const res = await request(app)
      .post('/api/pagamentos')
      .send({
        valor: 4500.00,
        status: 'pendente',
        compraId: 1,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar todos os pagamentos', async () => {
    const res = await request(app).get('/api/pagamentos');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve finalizar um pagamento', async () => {
    // Cria um pagamento pendente
    const pagamento = await Pagamento.create({
      valor: 4500.00,
      status: 'pendente',
      compraId: 1,
    });

    // Atualiza o status do pagamento para "pago"
    const res = await request(app)
      .put(`/api/pagamentos/${pagamento.id}`)
      .send({
        status: 'pago',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('pago'); // Verifica se o status foi atualizado
  });

  it('deve atualizar o status da compra para "pago" quando o pagamento for finalizado', async () => {
    // Cria uma compra pendente
    const compra = await Compra.create({
      status: 'pendente',
    });

    // Cria um pagamento pendente associado à compra
    const pagamento = await Pagamento.create({
      valor: 4500.00,
      status: 'pendente',
      compraId: compra.id,
    });

    // Atualiza o status do pagamento para "pago"
    const res = await request(app)
      .put(`/api/pagamentos/${pagamento.id}`)
      .send({
        status: 'pago',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('pago'); // Verifica se o pagamento foi atualizado

    // Verifica se o status da compra foi atualizado para "pago"
    const compraAtualizada = await Compra.findByPk(compra.id);
    expect(compraAtualizada.status).toEqual('pago');
  });
});