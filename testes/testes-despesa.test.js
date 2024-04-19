const axios = require('axios');
const assert = require('assert');

const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJMb2dpbiBFeGlzdGVudGUiLCJpYXQiOjE3MTM1MTczMjcsImV4cCI6MTcxMzUyMDkyN30.Ebc0V2Fl6_6M4cah2tFMC3R2puaP83j1PY0ml6U0TFM';
describe('Despesa - Endpoints', () => {
    describe('POST /Despesa', () => {
        
        it ('Criar Despesa Válida - 201', done => {
            
            const body = {
                descricao: "Despesa-teste",
                data: "2024-04-17",
                valor: 1.23,
                login: "teste"
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.post('http://localhost:3000/Despesa', body, config).
            then((res) => {
                assert.equal(res.status, 201);
                assert.equal(res.data.descricao, 'Despesa-teste');
                assert.equal(res.data.login, 'teste');
                done();
            });
            
        });
        it ('Criar Despesa Invalida Data Invalida - 400', done => {
            
            const body = {
                descricao: "Despesa-teste",
                data: "20-04-17",
                valor: 1.23,
                login: "teste"
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.post('http://localhost:3000/Despesa', body, config).
            then((res) => {
            }).catch((err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Data Inválida');
                done();
            }); 
        });
        it ('Criar Despesa Invalida Valor Invalido - 400', done => {
            
            const body = {
                descricao: "Despesa-teste",
                data: "2024-04-17",
                valor: -1.23,
                login: "teste"
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.post('http://localhost:3000/Despesa', body, config).
            then((res) => {
            }).catch((err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Valor Inválido');
                done();
            }); 
        });
        it ('Criar Despesa Invalida Descricao Invalida - 400', done => {
            
            const body = {
                descricao: "",
                data: "2024-04-17",
                valor: 1.23,
                login: "teste"
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.post('http://localhost:3000/Despesa', body, config).
            then((res) => {
            }).catch((err)=>{
                assert.equal(err.response.status, 400);
                assert.equal(err.response.data, 'Descrição Inválida');
                done();
            }); 
        });
        it ('Editar Despesa Valida - 200', done => {
            
            const body = {
                descricao: "Descricao",
                data: "2024-04-17",
                valor: 1.23,
                login: "Login Existente"
            };
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.put('http://localhost:3000/Despesa', body, config).
            then((res) => {
                assert.equal(res.status, 204);
                done();
            }).catch((err)=>{
            }); 
        });
        it ('Listar Despesas Válidas - 200', done => {
            
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                }
            }
            axios.get('http://localhost:3000/Despesa', config).
            then((res) => {
                assert.equal(res.status, 200);
                done();
            }).catch((err)=>{
            }); 
        });
        it ('Deletar Despesa Valida - 200', done => {
            let config = {
                headers: {
                    'Authorization': 'Bearer '+bearer
                  }
              }
            axios.delete('http://localhost:3000/Despesa?id=1', config).
            then((res) => {
                assert.equal(res.status, 204);
                done()
            }).catch((err)=> {
            });
        });
    });
});