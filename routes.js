const express = require('express');
const { UsuarioController, LoginController } = require('./controllers/usuario-controller')
const { DespesaController } = require('./controllers/despesa-controller')

const router = express.Router();

router.use('/Login', LoginController);
router.use('/Usuario', UsuarioController);
router.use('/Despesa', DespesaController);

module.exports = router;