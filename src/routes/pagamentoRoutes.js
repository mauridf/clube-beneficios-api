const express = require('express');
const PagamentoController = require('../controllers/PagamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas protegidas (apenas para usuários autenticados)
router.post('/pagamentos', authMiddleware, PagamentoController.create);
router.get('/pagamentos', authMiddleware, PagamentoController.findAll);
router.get('/pagamentos/:id', authMiddleware, PagamentoController.findById);
router.put('/pagamentos/:id', authMiddleware, PagamentoController.update);
router.delete('/pagamentos/:id', authMiddleware, PagamentoController.delete);

// Rota para buscar pagamento por compraId
router.get('/compras/:compraId/pagamentos', authMiddleware, PagamentoController.findByCompraId);

module.exports = router;