const axios = require('axios');
const assert = require('assert');

const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJMb2dpbiBFeGlzdGVudGUiLCJpYXQiOjE3MTM1MTI0NTgsImV4cCI6MTcxMzUxNjA1OH0.zQ6cl2ngXmZjzIoLUkOf4Q25QwmFiP3rawWBiqAB9h4';
describe('Usuario - Endpoints', () => {
    describe('/Usuario', () => {
        
        it ('Criação de Usuário Válida - 201', done => {
            
            const body = {
                login: 'Teste',
                senha: 'Senha'
            };
            let config = {
                
              }
            axios.post('http://localhost:3000/Usuario', body, config).
            then((res) => {
                assert.equal(res.status, 201);
                assert.equal(res.data.login, 'Teste');
                assert.equal(res.data.senha, 'Senha');
                done();
            });
            
        });
        it ('Criação de Usuário inválida (Login vazio) - 400', done => {
            const body = {
                login: '',
                senha: 'Senha'
            };
            let config = {
             
              }
            axios.post('http://localhost:3000/Usuario', body, config).
            then((res) => {
            }).catch( (err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Login vazio');
                done();
            });
            
        });
        it ('Criação de Usuário inválida (Login Inválido) - 400', done => {
            const body = {
                login: 'Login Existente',
                senha: 'Senha'
            };
            let config = {
               
              }
            axios.post('http://localhost:3000/Usuario', body, config).
            then((res) => {
            }).catch( (err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Login ja Existente');
                done();
            });
        });
        it ('Criação de Usuário inválida (Senha vazia) - 400', done => {
            const body = {
                login: 'Login Existente',
                senha: ''
            };
            let config = {
               
              }
            axios.post('http://localhost:3000/Usuario', body, config).
            then((res) => {
            }).catch( (err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Senha vazia');
                done();
            });
        });
        it ('Login Válido - 202', done => {
            
            const body = {
                login: 'Login Existente',
                senha: 'senha'
            };
            let config = {
               
              }
            axios.post('http://localhost:3000/Login', body, config).
            then((res) => {
                assert.equal(res.status, 202);
                done();
            });
            
        });
        it ('Login Inválido com Login Inexistente - 202', done => {
            
            const body = {
                login: 'Login',
                senha: 'senha'
            };
            let config = {
               
              }
            axios.post('http://localhost:3000/Login', body, config).
            then((res) => {
            }).catch((err) =>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Usuário não encontrado');
                done();
            });
            
        });
        it ('Lista Usuario Valido - 200', done => {
            
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                  }
              }
            axios.get('http://localhost:3000/Usuario', config).
            then((res) => {
                assert.equal(res.status, 200);
                assert.equal(res.data.length,2);
                done();
            }).catch((err) =>{
            });
            
        });
        it ('Lista Usuario Invalido Token Ausente - 401', done => {
            
            let config = {
                headers: {
                    'Authorization': ''
                  }
              }
            axios.get('http://localhost:3000/Usuario', config).
            then((res) => {
            }).catch((err) =>{
                assert.equal(err.response.status, 401);
                assert.equal(err.response.data, 'Token de autenticação ausente');
                done();
            });
        });
        it ('Lista Usuario Invalido Token Inválido - 401', done => {
            
            let config = {
                headers: {
                    'Authorization': 'bearer token'
                  }
              }
            axios.get('http://localhost:3000/Usuario', config).
            then((res) => {
            }).catch((err) =>{
                assert.equal(err.response.status, 403);
                assert.equal(err.response.data, 'Token inválido');
                done();
            });
        });
        it ('Altera Usuario Válido - 204', done => {
            const body = {
                login: 'Teste',
                novaSenha: 'Senha'
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                  }
              }
            axios.put('http://localhost:3000/Usuario', body, config).
            then((res) => {
                assert.equal(res.status, 204);
                done();
            }).catch((err)=> {
                done()
            });
        });
        it ('Altera Usuario Invalido Senha Vazia - 400', done => {
            const body = {
                login: 'Teste',
                novaSenha: ''
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                  }
              }
            axios.put('http://localhost:3000/Usuario', body, config).
            then((res) => {
            }).catch((err)=> {
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Senha Vazia');
                done()
            });
        });
        it ('Deleta Usuario Valido - 200', done => {
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                  }
              }
            axios.delete('http://localhost:3000/Usuario?login=teste', config).
            then((res) => {
                assert.equal(res.status, 204);
                done()
            }).catch((err)=> {
            });
        });
    });
});