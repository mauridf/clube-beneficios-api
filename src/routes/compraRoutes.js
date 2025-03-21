const express = require('express');
const CompraController = require('../controllers/CompraController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas protegidas (apenas para usuários autenticados)
router.post('/compras', authMiddleware, CompraController.create);
router.get('/compras', authMiddleware, CompraController.findAll);
router.get('/compras/:id', authMiddleware, CompraController.findById);
router.put('/compras/:id', authMiddleware, CompraController.update);
router.delete('/compras/:id', authMiddleware, CompraController.delete);

// Rota para listar compras de um cliente específico
router.get('/clientes/:clienteId/compras', authMiddleware, CompraController.findByClienteId);

// Rotas para adicionar e buscar produtos de uma compra
router.post('/compras/:compraId/produtos', authMiddleware, CompraController.addProdutos);
router.get('/compras/:compraId/produtos', authMiddleware, CompraController.getProdutos);

module.exports = router;