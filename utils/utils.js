const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json('Token de autenticação ausente');
    }
    
    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(403).json( 'Token inválido' );
        }
        req.userId = decoded.userId;
        next();
    });
}

function loadModels() {
    const environment = process.env.NODE_ENV || 'development';
  
    if (environment === 'test') {
      return { UsuarioModel: require('../mocks/usuario-mock') };
    }

    return { UsuarioModel: require('../models/usuario-model') };
  }

module.exports = {
    authenticateToken,
    loadModels
}