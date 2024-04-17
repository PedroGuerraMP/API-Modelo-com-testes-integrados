const express = require('express');
const bodyParser = require('body-parser');
const UsuarioRepository = require('../repositories/usuario-repository')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('', async (req, res) => {
    try{
        const listaUsuario = await UsuarioRepository.listar();
        res.status(200).json(listaUsuario);

    } catch (error) {
        console.error('Erro ao Listar Usuarios:', error);
        res.status(400).json(error);
    }
});


app.post('', async (req, res) => {
    try{
        const novoUsuario = await UsuarioRepository.criar(req.body.login, req.body.senha)
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao Criar Usuario:', error);
        res.status(400).json(error);
    }
});

module.exports = app;