const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Rotas públicas
router.get('/produtos', ProdutoController.findAll);
router.get('/produtos/:id', ProdutoController.findById);

// Rotas protegidas (apenas para administradores)
router.post('/produtos', authMiddleware, adminMiddleware, ProdutoController.create);
router.put('/produtos/:id', authMiddleware, adminMiddleware, ProdutoController.update);
router.delete('/produtos/:id', authMiddleware, adminMiddleware, ProdutoController.delete);

module.exports = router;