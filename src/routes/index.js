const express = require('express');
const clienteRoutes = require('./clienteRoutes');
const produtoRoutes = require('./produtoRoutes');
const compraRoutes = require('./compraRoutes');

const router = express.Router();

router.use('/clientes', clienteRoutes);
router.use('/produtos', produtoRoutes);
router.use('/compras', compraRoutes);

module.exports = router;