const express = require('express');
const {UsuarioController, LoginController} = require('./controllers/usuario-controller')

const router = express.Router();
router.use('/Usuario', UsuarioController);
router.use('/Login', LoginController);

module.exports = router;