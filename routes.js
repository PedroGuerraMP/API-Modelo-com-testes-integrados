const express = require('express');
const UsuarioController = require('./controllers/usuario-controller')

const router = express.Router();
router.use('/Usuario', UsuarioController);

module.exports = router;