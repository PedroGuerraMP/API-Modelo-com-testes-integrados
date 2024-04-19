const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
        return { 
            UsuarioModel: require('../mocks/usuario-mock'),
            DespesaModel: require('../mocks/despesa-mock')
        };
    }

    return { 
        UsuarioModel: require('../models/usuario-model'),
        DespesaModel: require('../models/despesa-model')
    };
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seu_email@gmail.com',  // Seu endereço de email
      pass: 'sua_senha'              // Sua senha de email
    }
  });
  
async function enviarEmail (destinatarioEmail, assunto, corpo) {
    try {
        const mailOptions = {
        from: 'seu_email@gmail.com',   // Seu endereço de email
        to: destinatarioEmail,         // Endereço de email do destinatário
        subject: assunto,              // Assunto do email
        text: corpo                    // Corpo do email (texto simples)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
};

module.exports = {
    authenticateToken,
    loadModels,
    enviarEmail
}