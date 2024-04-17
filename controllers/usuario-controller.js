const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const UsuarioRepository = require('../repositories/usuario-repository')
const { authenticateToken } = require('../utils/utils')

const UsuarioController = express();
const LoginController = express();

UsuarioController.use(bodyParser.json());
LoginController.use(bodyParser.json());

UsuarioController.get('', authenticateToken, async (req, res) => {
    try{
        const listaUsuario = await UsuarioRepository.listar();
        res.status(200).json(listaUsuario);

    } catch (error) {
        console.error('Erro ao Listar Usuarios:', error);
        res.status(400).json(error);
    }
});

UsuarioController.post('', authenticateToken, async (req, res) => {
    try{
        const { login, senha } = req.body;
        const novoUsuario = await UsuarioRepository.criar(login, senha)
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao Criar Usuario:', error);
        res.status(400).json(error);
    }
});

UsuarioController.put('', authenticateToken, async (req, res) => {
    try{
        const { login, novaSenha } = req.body;
        const novoUsuario = await UsuarioRepository.editar(login, novaSenha)
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao Editar Usuario:', error);
        res.status(400).json(error);
    }
});

UsuarioController.delete('', authenticateToken, async (req, res) => {
    try{
        const { login } = req.body;
        await UsuarioRepository.deletar(login)
        res.status(204).json();
    } catch (error) {
        console.error('Erro ao Deletar Usuario:', error);
        res.status(400).json(error);
    }
});


LoginController.post('', async (req, res) => {
    try{
    const { login, senha } = req.body;
    
    const usuario = await UsuarioRepository.pesquisarPorLogin(login)
    
    if (!usuario) 
        throw 'Usuário não encontrado';
    
    if (!await bcrypt.compare(senha, usuario.senha))
        throw 'Credenciais inválidas';
    
    const token = jwt.sign({ userId: login }, 'secreto', { expiresIn: '1h' });
    
    res.json({ token });

    } catch (error) {
        console.error('Erro ao Criar Usuario:', error);
        res.status(400).json(error);
    }
});

module.exports = {
    UsuarioController,
    LoginController
};