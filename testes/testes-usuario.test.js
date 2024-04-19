const axios = require('axios');
const assert = require('assert');

const UsuarioModel = require('../models/usuario-model');

describe('Usuario - Endpoints', () => {
    describe('POST /api/usuario', () => {
        
        it ('Criação de Usuário Válida - 201', done => {
            
            const body = {
                login: 'Teste',
                senha: 'Senha'
            };
            let config = {
                headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0ZSIsImlhdCI6MTcxMzQyMTY1NywiZXhwIjoxNzEzNDI1MjU3fQ.R2t5GuAMe46s4P9QUImB9s6_9oD3C3TjLQhIGNUC-Iw'
                }
              }
            axios.post('http://localhost:3000/Usuario', body, config).
            then((res) => {
                assert.equal(res.status, 201);
                assert.equal(res.data.login, 'Teste');
                assert.equal(res.data.senha, 'Senha');
                done();
            }).catch( (err)=>{
                done(err)
            });
            
        });
        it ('deve retornar usuário existente - 303', done => {
            done();
        });
        it ('deve retornar campos obrigatórios não informados ou inválidos - 500', done => {
            done();
        });
    });
});