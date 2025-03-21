const express = require('express');
const clienteRoutes = require('./clienteRoutes');

const router = express.Router();

router.use('/clientes', clienteRoutes);

module.exports = router;