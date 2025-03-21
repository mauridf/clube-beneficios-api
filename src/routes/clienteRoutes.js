const express = require('express');
const ClienteController = require('../controllers/ClienteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/clientes', ClienteController.create);
router.post('/clientes/login', ClienteController.login);
router.get('/clientes', authMiddleware, ClienteController.findAll);

module.exports = router;