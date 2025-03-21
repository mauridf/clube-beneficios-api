const express = require('express');
const clienteRoutes = require('./clienteRoutes');
const produtoRoutes = require('./produtoRoutes');

const router = express.Router();

router.use('/clientes', clienteRoutes);
router.use('/produtos', produtoRoutes);

module.exports = router;